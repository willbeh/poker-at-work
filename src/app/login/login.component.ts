import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthProvider, Auth } from '@angular/fire/auth'
import * as firebaseui from "firebaseui";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy{
  private auth = inject(Auth)
  // FirebaseUI config.
  uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
     GoogleAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '/',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('/');
    }
  };

  ui = new firebaseui.auth.AuthUI(this.auth);

  ngOnInit(): void {
    this.ui.start('#firebaseui-auth-container', this.uiConfig)
  }

  ngOnDestroy(): void {
    this.ui.delete().then();
  }
}
