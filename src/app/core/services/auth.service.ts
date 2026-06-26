import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.userServiceUrl}/users`;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      request
    );

  }

  register(request: any) {

    return this.http.post(
      `${this.baseUrl}/register`,
      request
    );

  }

}