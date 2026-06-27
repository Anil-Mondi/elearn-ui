import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl =
    `${environment.reviewServiceUrl}/review`;

  constructor(
    private http: HttpClient
  ) {}

  addReview(
    review: Review
  ): Observable<Review> {

    return this.http.post<Review>(
      this.baseUrl,
      review
    );

  }

  getReviews(
    courseId: number
  ): Observable<Review[]> {

    return this.http.get<Review[]>(
      `${this.baseUrl}/course/${courseId}`
    );

  }

}