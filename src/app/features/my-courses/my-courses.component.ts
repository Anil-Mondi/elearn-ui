import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PurchaseService } from '../../core/services/purchase.service';
import { CourseService } from '../../core/services/course.service';
import { UserService } from '../../core/services/user.service';

import { Course } from '../../core/models/course';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {

  courses: Course[] = [];

  isLoading = true;

  constructor(
    private purchaseService: PurchaseService,
    private courseService: CourseService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadMyCourses();

  }

  loadMyCourses(): void {

    const user = this.userService.getCurrentUser();

    if (!user) {

      this.isLoading = false;

      return;

    }

    this.purchaseService
      .getPurchases(user.userId)
      .subscribe({

        next: (purchases: any[]) => {

          if (purchases.length === 0) {

            this.isLoading = false;

            return;

          }

          purchases.forEach(purchase => {

            this.courseService
              .getCourseById(purchase.courseId)
              .subscribe({

                next: (course: Course) => {

                  this.courses.push(course);

                  this.isLoading = false;

                }

              });

          });

        },

        error: error => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

  openCourse(courseId: number): void {

    this.router.navigate(['/courses', courseId]);

  }

}