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
import { map, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '@angular/fire/auth';
import { TopbarComponent } from 'src/app/shared/component/topbar/topbar.component';

@Component({
    selector: 'app-update-name',
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TopbarComponent,
    ],
    templateUrl: './update-name.component.html',
    styleUrl: './update-name.component.scss',
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
