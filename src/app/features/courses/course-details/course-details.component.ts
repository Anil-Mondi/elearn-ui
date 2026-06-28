import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { PurchaseService } from '../../../core/services/purchase.service';
import { UserService } from '../../../core/services/user.service';

import { Course } from '../../../core/models/course';
import { Purchase } from '../../../core/models/purchase';

import { FormsModule } from '@angular/forms';

import { ReviewService } from '../../../core/services/review.service';

import { Review } from '../../../core/models/review';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  reviews: Review[] = [];

  reviewText = '';

  rating = 5;

  course!: Course;

  ownedCourse = false;

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private purchaseService: PurchaseService,
    private userService: UserService,
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {

    this.ownedCourse =
      this.route.snapshot.queryParamMap.get('owned') === 'true';

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.courseService
      .getCourseById(id)
      .subscribe({

        next: (response: Course) => {

          this.course = response;

          this.isLoading = false;

          this.loadReviews();

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

 
  enrollCourse(): void {
    console.log('Enroll clicked');

    const user = this.userService.getCurrentUser();

    console.log('Current User :', user);

    if (!user) {
      alert('User is NULL');

      return;
    }

    console.log('Course :', this.course);

    const purchase: Purchase = {
      learnerId: user.userId,

      courseId: this.course.courseId,

      serviceId: 1,
    };

    console.log('Purchase Object :', purchase);

    this.purchaseService.purchaseCourse(purchase).subscribe({
      next: (response) => {
        console.log('Purchase Success', response);

        alert('Course Purchased Successfully');
      },

      error: (error) => {
        console.error('Purchase Error', error);

        if (error.status === 409) {
          alert(error.error.message);
        } else {
          alert('Something went wrong.');
        }
      },
    });
  }

  test(): void {
    alert('Button Working');
  }

  loadReviews(): void {
    this.reviewService.getReviews(this.course.courseId).subscribe({
      next: (response) => {
        this.reviews = response;
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  submitReview(): void {
    const user = this.userService.getCurrentUser();

    if (!user) {
      alert('Please login');

      return;
    }

    const review: Review = {
      learnerId: user.userId,

      courseId: this.course.courseId,

      reviewText: this.reviewText,

      rating: this.rating,
    };

    this.reviewService.addReview(review).subscribe({
      next: () => {
        alert('Review Added Successfully');

        this.reviewText = '';

        this.rating = 5;

        this.loadReviews();
      },

      error: (error) => {
        console.error(error);

        alert(error.error?.message || 'Unable to submit review');
      },
    });
  }
}
