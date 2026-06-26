import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getEmail(): string {

    const token = localStorage.getItem('access_token');

    if (!token) {

      return '';

    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.sub;

  }

}