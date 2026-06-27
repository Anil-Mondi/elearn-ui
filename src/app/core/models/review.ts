export interface Review {

  reviewId?: number;

  courseId: number;

  learnerId: number;

  reviewText: string;

  rating: number;

  createdAt?: string;

}