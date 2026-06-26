import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { CourseDetailsComponent } from './features/courses/course-details/course-details.component';

import { ProfileComponent } from './features/profile/profile.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'courses',
    component: CourseListComponent
  },

  {
    path: 'courses/:id',
    component: CourseDetailsComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  }

];