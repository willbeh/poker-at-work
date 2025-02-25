import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthProvider, Auth, signInWithPopup } from '@angular/fire/auth'
import {Router, RouterModule} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButton],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  async loginWithGoogle() {
    const user = await signInWithPopup(this.auth, new GoogleAuthProvider());

    if(user) {
      this.router.navigate(['/']);
    }
  }
}
