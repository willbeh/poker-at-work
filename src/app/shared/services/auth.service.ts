import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInAnonymously,
  updateProfile,
  User,
} from '@angular/fire/auth';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ProfileService } from './profile.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private profileService = inject(ProfileService);

  user$ = authState(this.auth).pipe(
    tap(async (user) => {
      if (!user) {
        await signInAnonymously(this.auth);
      }

      const profile = await this.profileService.getProfile(user!.uid);

      if (!profile.exists()) {
        await this.profileService.createProfile(user!);
      }
    }),
    shareReplay(1)
  );

  authUser$ = this.user$.pipe(
    map((user) => {
      if (user && !user.isAnonymous) {
        return user;
      }
      return null;
    })
  );

  async updateName(user: User, name: string) {
    await this.profileService.updateProfile(user.uid, { name });
    return await updateProfile(user, { displayName: name });
  }
}
