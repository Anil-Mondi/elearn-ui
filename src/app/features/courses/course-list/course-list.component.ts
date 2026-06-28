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

  search = '';

  selectedCategory = 'ALL';

  sortBy = 'rating';

  isLoading = true;

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadCourses();

  }

  loadCourses(): void {

    this.courseService
      .getAllCourses()
      .subscribe({

        next:(courses)=>{

          this.courses = courses;

          this.applyFilters();

          this.isLoading=false;

        },

        error:(error)=>{

          console.error(error);

          this.isLoading=false;

        }

      });

  }

  applyFilters(): void {

    this.filteredCourses = [...this.courses];

    if(this.search.trim()){

      this.filteredCourses =
      this.filteredCourses.filter(c=>

        c.courseName
          .toLowerCase()
          .includes(this.search.toLowerCase())

      );

    }

    if(this.selectedCategory!=='ALL'){

      this.filteredCourses =
      this.filteredCourses.filter(c=>

        c.category===this.selectedCategory

      );

    }

    switch(this.sortBy){

      case 'priceLow':

        this.filteredCourses.sort((a,b)=>a.price-b.price);

        break;

      case 'priceHigh':

        this.filteredCourses.sort((a,b)=>b.price-a.price);

        break;

      default:

        this.filteredCourses.sort((a,b)=>b.avgRating-a.avgRating);

    }

  }

  viewCourse(courseId:number){

    this.router.navigate(['/courses',courseId]);

  }

}