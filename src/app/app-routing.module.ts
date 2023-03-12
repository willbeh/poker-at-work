import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
