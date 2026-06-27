import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private baseUrl =
    `${environment.purchaseServiceUrl}/purchase-history`;

  constructor(
    private http: HttpClient
  ) {}

  purchaseCourse(
    purchase: Purchase
  ): Observable<any> {

    return this.http.post(
      this.baseUrl,
      purchase
    );

  }

  getPurchases(
    learnerId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.baseUrl}/learner/${learnerId}`
    );

  }

}