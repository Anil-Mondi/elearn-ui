import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  courses: any[] = [];

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.courseService.getAllCourses()
      .subscribe({

        next: (response: any) => {

          console.log('Courses:', response);

          this.courses = response;
        },

        error: (error) => {

          console.error('API Error:', error);

        }

      });

  }

}