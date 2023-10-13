import { ArrPathName, ClassName, ClassNameKey, OPTIONS_SORTING } from './const';
import { Offers } from './types/offers-type';

export function getSortingBy(offers: Offers, option: string) {
  const currentOffers = [...offers];

  switch (option) {
    case OPTIONS_SORTING[1]:
      currentOffers.sort((a, b) => a.price - b.price);
      break;
    case OPTIONS_SORTING[2]:
      currentOffers.sort((a, b) => b.price - a.price);
      break;
    case OPTIONS_SORTING[3]:
      currentOffers.sort((a, b) => b.rating - a.rating);
      break;
  }

  return currentOffers;
}

export function getFormattedDateForReview(date: string) {
  const reviewDate = new Date(date);
  const prepareDate = reviewDate.toLocaleString('en-EN', {
    month: 'long',
    year: 'numeric',
  });

  return prepareDate;
}

export function getItemPluralFormatted(item: string, quantity: number) {
  return !quantity || quantity > 1 ? `${item}s` : item;
}

export function getClassNameForLayout(pathname: string) {
  let result = '';

  ArrPathName.forEach((elem: ClassNameKey) => {
    if (pathname.indexOf(elem) !== -1) {
      return (result = ClassName[elem]);
    }
  });
  return result || ClassName.main;
}
