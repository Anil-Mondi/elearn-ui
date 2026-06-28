import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TokenService } from '../../core/services/token.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  mobileMenuOpen = false;

  constructor(
    public tokenService: TokenService,
    public userService: UserService,
    private router: Router
  ){}

  toggleMenu(): void{

    this.mobileMenuOpen = !this.mobileMenuOpen;

  }

  closeMenu(): void{

    this.mobileMenuOpen = false;

  }

  logout(): void{

    this.tokenService.clear();

    localStorage.removeItem('current_user');

    this.closeMenu();

    this.router.navigate(['/login']);

  }

  getInitial(): string{

    const user = this.userService.getCurrentUser();

    if(user){

      return user.name.charAt(0).toUpperCase();

    }

    return 'U';

  }

}