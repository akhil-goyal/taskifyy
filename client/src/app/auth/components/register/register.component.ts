import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'auth-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log('onSubmit', this.form.value);
  }
}
