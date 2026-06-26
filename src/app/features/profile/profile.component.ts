import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { JwtService } from '../../core/services/jwt.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user!: User;

  isLoading = true;

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {

    const email = this.jwtService.getEmail();

    this.userService.getUserByEmail(email)
      .subscribe({

        next: (response: User) => {

          this.user = response;

          this.isLoading = false;

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

}