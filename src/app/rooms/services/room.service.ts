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
} from '@angular/fire/database';
import { map, shareReplay } from 'rxjs';
import { Presence } from '../models/presence';
import { Room } from '../models/room';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private db = inject(Database);
  private colRef = ref(this.db, 'rooms');

  createRoom(uid: string) {
    const room = push(this.colRef, {
      name: new Date().toISOString(),
      owner: uid,
      options: [1, 2, 3, 5, 8, 13, 20, 40],
    });

    const story = this.createStory(room.key!);

    set(ref(this.db, `rooms/${room.key}/storyId`), story.key);

    return room;
  }

  createStory(roomId: string) {
    return push(ref(this.db, `stories`), {
      date: serverTimestamp(),
      roomId,
      status: 'active',
    });
  }

  getRoom(roomId: string) {
    return objectVal<Room>(ref(this.db, `rooms/${roomId}`), {
      keyField: 'id',
    }).pipe(shareReplay(1));
  }

  getPresence(roomId: string) {
    console.log('getPresence', roomId);
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
