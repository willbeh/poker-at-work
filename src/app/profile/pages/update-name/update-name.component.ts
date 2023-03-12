import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { map, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-update-name',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-name.component.html',
  styles: [],
})
export class UpdateNameComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  vm$ = this.authService.user$.pipe(
    withLatestFrom(this.route.queryParams),
    map(([user, params]) => {
      const path = 'history' in params ? decodeURI(params['history']) : '/';

      return {
        user,
        path,
      };
    })
  );

  async updateName(user: User | null, path: string) {
    await this.authService.updateName(user!, this.formGroup.value.name!);
    this.router.navigateByUrl(path);
  }
}
