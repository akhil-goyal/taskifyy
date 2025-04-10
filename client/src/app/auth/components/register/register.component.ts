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

@Component({
  selector: 'auth-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  error: string | null = null;
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit(): void {
    this.authService.register(this.form.getRawValue()).subscribe({
      next: (currentUser) => {
        console.log('currentUser:', currentUser);
        this.authService.setToken(currentUser);
        this.authService.setCurrenUser(currentUser);
      },
      error: (err: HttpErrorResponse) => {
        console.log('err', err.error);
        this.error = err.error.join(', ');
      },
    });
  }
}
