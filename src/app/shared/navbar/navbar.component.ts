import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    public tokenService: TokenService,
    private router: Router
  ) {}

  logout(): void {

    this.tokenService.clear();

    this.router.navigate(['/']);

  }

}