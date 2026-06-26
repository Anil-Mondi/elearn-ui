import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadCourses();

  }

  loadCourses(): void {

    this.courseService.getAllCourses()
      .subscribe({

        next: (response: Course[]) => {

          this.courses = response;

          this.isLoading = false;

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

  viewCourse(courseId: number): void {

    this.router.navigate(['/courses', courseId]);

  }

}