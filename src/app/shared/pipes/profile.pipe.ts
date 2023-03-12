import { inject, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
@Pipe({
  standalone: true,
  name: 'profile',
})
export class ProfilePipe implements PipeTransform {
  private profileService = inject(ProfileService);

  transform(uid: string): Observable<Profile> {
    return this.profileService.profile(uid);
  }
}
