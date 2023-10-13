import { User } from './user-type';

export type Offers = Offer[];

export type Offer = {
  bedrooms: number;
  city: {
    location: Location;
    name: string;
  };
  description: string;
  goods: string[];
  host: User;
  id: number;
  images: string[];
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type City = {
  location: Location;
  name: string;
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type OfferId = {
  id: number;
};
