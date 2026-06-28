import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../../core/services/course.service';
import { PurchaseService } from '../../../core/services/purchase.service';
import { ReviewService } from '../../../core/services/review.service';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../core/services/toast.service';

import { Course } from '../../../core/models/course';
import { Purchase } from '../../../core/models/purchase';
import { Review } from '../../../core/models/review';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  course!: Course;

  reviews: Review[] = [];

  reviewText = '';

  rating = 5;

  ownedCourse = false;

  isLoading = true;

  isSubmittingReview = false;

  isPurchasing = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private purchaseService: PurchaseService,
    private reviewService: ReviewService,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {

    this.ownedCourse =
      this.route.snapshot.queryParamMap.get('owned') === 'true';

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadCourse(id);

  }

  loadCourse(courseId:number):void{

    this.courseService
      .getCourseById(courseId)
      .subscribe({

        next:(course)=>{

          this.course = course;

          this.isLoading = false;

          this.loadReviews();

        },

        error:(error)=>{

          console.error(error);

          this.isLoading = false;

          this.toastService.showError('Unable to load course.');

        }

      });

  }

  loadReviews():void{

    this.reviewService
      .getReviews(this.course.courseId)
      .subscribe({

        next:(response)=>{

          this.reviews = response;

        },

        error:(error)=>{

          console.error(error);

        }

      });

  }

  enrollCourse():void{

    if(this.isPurchasing){

      return;

    }

    const user =
      this.userService.getCurrentUser();

    if(!user){

      this.toastService.showError('Please login again.');

      return;

    }

    this.isPurchasing = true;

    const purchase:Purchase={

      learnerId:user.userId,

      courseId:this.course.courseId,

      serviceId:1

    };

    this.purchaseService
      .purchaseCourse(purchase)
      .subscribe({

        next:()=>{

          this.isPurchasing=false;

          this.ownedCourse=true;

          this.toastService.showSuccess('🎉 Course Purchased Successfully');

        },

        error:(error)=>{

          this.isPurchasing=false;

          console.error(error);

          if(error.status===409){

            this.toastService.showError(error.error?.message || 'Course already purchased');

          }

          else{

            this.toastService.showError('Unable to purchase course.');

          }

        }

      });

  }

  submitReview():void{

    if(this.reviewText.trim().length===0){

      this.toastService.showError('Please write your review.');

      return;

    }

    const user =
      this.userService.getCurrentUser();

    if(!user){

      this.toastService.showError('Please login.');

      return;

    }

    this.isSubmittingReview=true;

    const review:Review={

      learnerId:user.userId,

      courseId:this.course.courseId,

      reviewText:this.reviewText,

      rating:this.rating

    };

    this.reviewService
      .addReview(review)
      .subscribe({

        next:()=>{

          this.isSubmittingReview=false;

          this.reviewText='';

          this.rating=5;

          this.loadReviews();

          this.loadCourse(this.course.courseId);

          this.toastService.showSuccess('Review submitted successfully.');

        },

        error:(error)=>{

          this.isSubmittingReview=false;

          console.error(error);

          this.toastService.showError(error.error?.message || 'Unable to submit review');

        }

      });

  }

}