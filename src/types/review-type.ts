import { User } from './user-type';

export type Reviews = Review[];

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type NewReview = {
  hotelId: number;
  comment: string;
  rating: number;
};
