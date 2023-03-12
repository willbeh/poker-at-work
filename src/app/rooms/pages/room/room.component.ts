import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './room.component.html',
  styles: [],
})
export class RoomComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);

  user$ = this.authService.user$.pipe(
    withLatestFrom(this.route.params),
    map(([user, params]) => {
      console.log('user', user);
      if (!user) {
        return;
      }
      console.log('user', user.uid, params['id']);
      this.roomService.presence(params['id'], user);
      return user;
    })
  );

  // user$ = this.authService.user$.pipe(
  //   map((user) => {
  //     console.log('user', user);
  //     return user;
  //   })
  // );
}
