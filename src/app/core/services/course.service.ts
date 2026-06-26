import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl =
    `${environment.courseServiceUrl}/courses`;

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {

    console.log('Calling API => ', this.baseUrl);

    return this.http.get<Course[]>(this.baseUrl);

  }

}