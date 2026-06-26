import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  course!: Course;

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourseById(id)
      .subscribe({

        next: (response: Course) => {

          this.course = response;

          this.isLoading = false;

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

}