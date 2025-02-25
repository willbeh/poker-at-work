import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-main-layout',
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './main-layout.component.html',
    styles: []
})
export class MainLayoutComponent {
  private authService = inject(AuthService);

  authUser$ = this.authService.authUser$;
}
