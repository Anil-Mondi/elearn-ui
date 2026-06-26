import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];

  isLoading = true;

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    console.log('Loading Courses...');

    this.courseService.getAllCourses()
      .subscribe({

        next: (response: Course[]) => {

          console.log('Courses:', response);

          this.courses = response;

          this.isLoading = false;

        },

        error: (error) => {

          console.error('API Error:', error);

          this.isLoading = false;

        }

      });

  }

}