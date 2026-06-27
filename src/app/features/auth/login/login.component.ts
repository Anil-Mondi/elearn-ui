import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';
import { JwtService } from '../../../core/services/jwt.service';
import { UserService } from '../../../core/services/user.service';

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
    private jwtService: JwtService,
    private userService: UserService,
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

          this.tokenService.saveToken(response.token);

          this.tokenService.saveRole(response.role);

          const email =
            this.jwtService.getEmail();

          this.userService
            .getUserByEmail(email)
            .subscribe({

              next: () => {

                this.router.navigate(['/']);

              }

            });

        },

        error: (error) => {

          console.error(error);

          alert('Invalid Email or Password');

        }

      });

  }

}