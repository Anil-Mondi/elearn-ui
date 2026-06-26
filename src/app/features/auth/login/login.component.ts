import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(): void {

    const request = {
      email: this.email,
      password: this.password
    };

    this.authService.login(request)
      .subscribe({

        next: (response) => {

          console.log('Login Success', response);

          this.tokenService.saveToken(response.token);
          this.tokenService.saveRole(response.role);

          this.router.navigate(['/']);

        },

        error: (error) => {

          console.error(error);

          alert('Invalid Email or Password');

        }

      });

  }

}