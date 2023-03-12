import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInAnonymously,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  user$ = authState(this.auth).pipe(
    tap((user) => {
      if (!user) {
        signInAnonymously(this.auth);
      }
    })
  );

  authUser$ = this.user$.pipe(
    map((user) => {
      if (user && !user.isAnonymous) {
        return user;
      }
      return null;
    })
  );

  updateName(user: User, name: string) {
    return updateProfile(user, { displayName: name });
  }
}
