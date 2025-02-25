import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  Database,
  onValue,
  ref,
  serverTimestamp,
  onDisconnect,
  set,
  push,
  objectVal,
  query,
  equalTo,
  orderByChild,
  update,
} from '@angular/fire/database';
import { map, shareReplay } from 'rxjs';
import { Presence } from '../models/presence';
import { Room } from '../models/room';
import { Story } from '../models/story';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private db = inject(Database);
  private colRef = ref(this.db, 'rooms');

  createRoom(uid: string) {
    const room = push(this.colRef, {
      name: new Date().toISOString(),
      owner: uid,
      options: [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 40],
    });

    this.createStory(room.key!);

    return room;
  }

  updateRoom(roomId: string, data: Partial<Room>) {
    return update(ref(this.db, `rooms/${roomId}`), data);
  }

  getRoom(roomId: string) {
    return objectVal<Room>(ref(this.db, `rooms/${roomId}`), {
      keyField: 'id',
    }).pipe(shareReplay(1));
  }

  createStory(roomId: string) {
    const story = push(ref(this.db, `stories`), {
      date: serverTimestamp(),
      roomId,
      status: 'active',
    });

    this.updateRoom(roomId, { storyId: story.key! });
  }

  updateStory(storyId: string, data: any) {
    return update(ref(this.db, `stories/${storyId}`), data);
  }

  updateStoryVote(storyId: string, uid: string, vote: number) {
    return set(ref(this.db, `stories/${storyId}/votes/${uid}`), vote);
  }

  getStory(storyId: string) {
    return objectVal<Story>(ref(this.db, `stories/${storyId}`), {
      keyField: 'id',
    });
  }

  getStories(roomId: string) {
    const q = query(
      ref(this.db, 'stories'),
      orderByChild('roomId'),
      equalTo(roomId)
    );
    return objectVal<{ [key: string]: Story }>(q).pipe(
      map((stories) => {
        const storiesArray: Story[] = [];
        for (let key in stories) {
          storiesArray.push({ ...stories[key], id: key });
        }
        return storiesArray.reverse();
      })
    );
  }

  processStory(story: Story) {
    const votes = Object.values(story.votes!).filter((v) => v > 0);
    const sum = votes.reduce((a, b) => a + b, 0);
    const average = sum / votes.length || 0;

    this.updateStory(story.id!, { average, status: 'completed' });
  }

  getPresence(roomId: string) {
    const q = query(
      ref(this.db, 'presence'),
      orderByChild('q'),
      equalTo(`${roomId}-online`)
    );
    return objectVal<{ [key: string]: Presence }>(q).pipe(
      map((presence) => {
        const people: Presence[] = [];
        for (let key in presence) {
          people.push({ ...presence[key], uid: key });
        }
        return people;
      })
    );
  }

  presence(roomId: string, user: User) {
    const userStatusDatabaseRef = ref(this.db, `presence/${user.uid}`);
    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: serverTimestamp(),
      name: user.displayName,
      uid: user.uid,
      roomId: roomId,
      q: `${roomId}-offline`,
    };
    const isOnlineForDatabase = {
      state: 'online',
      last_changed: serverTimestamp(),
      name: user.displayName,
      uid: user.uid,
      roomId: roomId,
      q: `${roomId}-online`,
    };

    const connectedRef = ref(this.db, '.info/connected');

    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === false) {
        return;
      }

      onDisconnect(userStatusDatabaseRef)
        .set(isOfflineForDatabase)
        .then(() => {
          set(userStatusDatabaseRef, isOnlineForDatabase);
        });
    });
  }
}
