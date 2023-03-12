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
} from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private db = inject(Database);
  private colRef = ref(this.db, 'rooms');

  createRoom(uid: string) {
    return push(this.colRef, {
      name: new Date().toISOString(),
      owner: uid,
    });
  }

  presence(roomId: string, user: User) {
    const userStatusDatabaseRef = ref(
      this.db,
      `rooms/${roomId}/presence/${user.uid}`
    );
    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: serverTimestamp(),
      name: user.displayName,
    };
    const isOnlineForDatabase = {
      state: 'online',
      last_changed: serverTimestamp(),
      name: user.displayName,
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
