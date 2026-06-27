import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl =
    `${environment.userServiceUrl}/users`;

  private currentUser?: User;

  constructor(
    private http: HttpClient
  ) {}

  getUserByEmail(
    email: string
  ): Observable<User> {

    return this.http.get<User>(
      `${this.baseUrl}/email/${email}`
    ).pipe(

      tap(user => {

        this.currentUser = user;

        localStorage.setItem(
          'current_user',
          JSON.stringify(user)
        );

      })

    );

  }

  getCurrentUser(): User | undefined {

    if (this.currentUser) {

      return this.currentUser;

    }

    const user = localStorage.getItem('current_user');

    if (user) {

      this.currentUser =
        JSON.parse(user);

    }

    return this.currentUser;

  }

  clearCurrentUser(): void {

    this.currentUser = undefined;

    localStorage.removeItem('current_user');

  }

}