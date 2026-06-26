import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl =
    `${environment.userServiceUrl}/users`;

  constructor(
    private http: HttpClient
  ) {}

  getUserByEmail(
    email: string
  ): Observable<User> {

    return this.http.get<User>(
      `${this.baseUrl}/email/${email}`
    );

  }

}