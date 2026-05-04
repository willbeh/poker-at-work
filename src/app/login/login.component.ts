import {Component, inject} from '@angular/core';

import { GoogleAuthProvider, Auth, signInWithPopup } from '@angular/fire/auth'
import {Router, RouterModule} from "@angular/router";

@Component({
    selector: 'app-login',
    imports: [RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
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
