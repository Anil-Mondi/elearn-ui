import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];

  filteredCourses: Course[] = [];

  isLoading = true;

  searchText = '';

  selectedCategory = 'ALL';

  selectedSort = 'DEFAULT';

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

          this.filteredCourses = [...response];

          this.isLoading = false;

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

  applyFilters(): void {

    this.filteredCourses = this.courses.filter(course => {

      const matchesSearch =
        course.courseName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'ALL'
        || course.category === this.selectedCategory;

      return matchesSearch && matchesCategory;

    });

    switch(this.selectedSort){

      case 'PRICE_LOW':

        this.filteredCourses.sort((a,b)=>a.price-b.price);

        break;

      case 'PRICE_HIGH':

        this.filteredCourses.sort((a,b)=>b.price-a.price);

        break;

      case 'RATING':

        this.filteredCourses.sort((a,b)=>b.avgRating-a.avgRating);

        break;

    }

  }

  viewCourse(courseId:number):void{

    this.router.navigate(['/courses',courseId]);

  }

}