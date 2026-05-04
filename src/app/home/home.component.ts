import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RoomService } from '../rooms/services/room.service';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { TopbarComponent } from '../shared/component/topbar/topbar.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule, RouterModule, TopbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private roomService = inject(RoomService);
  private authService = inject(AuthService);
  private router = inject(Router);

  authUser$ = this.authService.authUser$;

  createNewRoom(uid: string) {
    this.roomService.createRoom(uid).then((room) => {
      this.router.navigate(['/room', room.key]);
    });
  }
}
