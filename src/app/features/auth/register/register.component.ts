import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/register-request';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  request: RegisterRequest = {

    name: '',

    email: '',

    contactNumber: '',

    password: '',

    role: 'LEARNER'

  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  register(): void {

    this.authService.register(this.request)
      .subscribe({

        next:()=>{

            this.toastService.showSuccess(
              'Registration Successful'
            );

            this.router.navigate(['/login']);

        },

        error:(error)=>{

            console.error(error);

            if(error.status===409){

                this.toastService.showError(
                  error.error
                );

            }

            else{

                this.toastService.showError(
                  'Registration Failed'
                );

            }

        }

    });

  }

}