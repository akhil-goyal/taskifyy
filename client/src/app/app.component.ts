import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { RegisterComponent } from './auth/components/register/register.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterComponent],
  templateUrl: './app.component.html',
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (currentUser) => {
        this.authService.setCurrentUser(currentUser);
      },
      error: (err) => {
        console.log('err', err);
        this.authService.setCurrentUser(null);
      },
    });
  }
}
