import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'auth-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage: string | null = null;
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.form.getRawValue()).subscribe({
      next: (currentUser) => {
        console.log('currentUser:', currentUser);
        this.authService.setToken(currentUser);
        this.authService.setCurrentUser(currentUser);
        this.errorMessage = null;
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        console.log('err', err.error);
        this.errorMessage = err.error.emailOrPassword;
      },
    });
  }
}
