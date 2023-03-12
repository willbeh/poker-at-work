import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, map, switchMap, withLatestFrom } from 'rxjs';
import { PresenceComponent } from '../../components/presence/presence.component';
import { OptionSelectionComponent } from '../../components/option-selection/option-selection.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PresenceComponent,
    OptionSelectionComponent,
  ],
  templateUrl: './room.component.html',
  styles: [],
})
export class RoomComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);

  focusRefresh = new BehaviorSubject<number>(0);

  vm$ = this.route.params.pipe(
    switchMap((params) => this.roomService.getRoom(params['id'])),
    withLatestFrom(this.authService.user$),
    map(([room, user]) => {
      if (!user) {
        return;
      }

      this.roomService.presence(room.id!, user);

      return {
        user,
        room,
      };
    })
  );
}
