import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RoomService } from '../rooms/services/room.service';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [CommonModule, MatButtonModule, RouterModule],
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent {
  private roomService = inject(RoomService);
  private authService = inject(AuthService);
  private router = inject(Router);

  authUser$ = this.authService.authUser$;

  createNewRoom(uid: string) {
    this.roomService.createRoom(uid).then((room) => {
      console.log('Room created', room.key);
      this.router.navigate(['/room', room.key]);
    });
  }
}
