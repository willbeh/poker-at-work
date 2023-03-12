import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs';
import { canActivate } from '@angular/fire/auth-guard';
import { User } from '@angular/fire/auth';

const redirectToUpdateName = (next: ActivatedRouteSnapshot) =>
  map((user: User | null) => {
    if (user && user.displayName) {
      return true;
    }
    //encode current path
    // const path = encodeURIComponent(next.pathFromRoot.map((v) => v.url.join('/')).join('/'));

    const history = encodeURIComponent(next.url.map((u) => u.path).join('/'));

    console.log('history', history);

    return `/update-name?history=${history}`;
  });

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'room/:id',
        loadComponent: () =>
          import('./rooms/pages/room/room.component').then(
            (c) => c.RoomComponent
          ),
        ...canActivate(redirectToUpdateName),
      },
      {
        path: 'update-name',
        loadComponent: () =>
          import('./profile/pages/update-name/update-name.component').then(
            (c) => c.UpdateNameComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
