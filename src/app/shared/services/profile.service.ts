import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Database, objectVal, ref, set, update } from '@angular/fire/database';
import { get } from '@firebase/database';
import { shareReplay } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private db = inject(Database);

  profile(uid: string) {
    return objectVal<Profile>(ref(this.db, `profiles/${uid}`), {
      keyField: 'id',
    }).pipe(shareReplay(1));
  }

  getProfile(uid: string) {
    return get(ref(this.db, `profiles/${uid}`));
  }

  createProfile(user: User) {
    return set(ref(this.db, `profiles/${user.uid}`), {
      name: user.displayName,
      email: user.email,
    });
  }

  updateProfile(uid: string, data: Partial<Profile>) {
    return update(ref(this.db, `profiles/${uid}`), data);
  }
}
