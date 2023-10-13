import { LOCATIONS_LIST } from '../const';
import { Offer, Offers } from '../types/offers-type';
import { datatype, helpers, image, internet } from 'faker';
import { Review, Reviews } from '../types/review-type';
import UserData from '../types/user-data-type';
import { NewReview } from '../types/review-type';

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(6),
  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: helpers.randomize([10, 13, 16]),
    },
    name: LOCATIONS_LIST[Math.floor(Math.random() * LOCATIONS_LIST.length)],
  },
  description: datatype.string(),
  goods: datatype.array(10).map((e) => String(e)),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
  id: datatype.number(),
  images: datatype.array(6).map(() => image.imageUrl(640, 480, 'nature', true)),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: helpers.randomize([10, 13, 16]),
  },
  maxAdults: datatype.number(6),
  previewImage: image.imageUrl(640, 480, 'cat', true),
  price: datatype.number(),
  rating: datatype.float(5),
  title: datatype.string(),
  type: helpers.randomize(['apartment', 'room', 'house', 'hotel']),
});

export const makeFakeOffers = (): Offers =>
  datatype.array(20).map(() => makeFakeOffer());

export const makeFakeNearOffers = (): Offers =>
  datatype.array(3).map(() => makeFakeOffer());

export const makeFakeReview = (): Review => ({
  comment: datatype.string(),
  date: datatype.string(),
  id: datatype.number(),
  rating: datatype.float(5),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
});

export const makeFakeReviews = (): Reviews =>
  datatype.array(20).map(() => makeFakeReview());

export const makeFakeComment = (): NewReview => ({
  hotelId: datatype.number(),
  comment: datatype.string(),
  rating: datatype.number(5),
});

export const makeFakeUserData = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  token: datatype.string(),
});
