export interface Course {

  courseId: number;

  courseName: string;

  description: string;

  category: CourseCategory;

  vendorId: number;

  status: CourseStatus;

  createdAt: string;

  updatedAt: string;

  price: number;

  avgRating: number;

  reviewCount: number;

}

export enum CourseCategory {

  SELF_LEARNING = 'SELF_LEARNING',

  INSTRUCTOR_LED = 'INSTRUCTOR_LED'

}

export enum CourseStatus {

  ACTIVE = 'ACTIVE',

  INACTIVE = 'INACTIVE'

}