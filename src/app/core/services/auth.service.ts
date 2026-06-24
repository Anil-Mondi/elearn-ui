import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // environment defines apiUrl; use that instead of apiGatewayUrl
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  login(request: any) {
    return this.http.post(
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