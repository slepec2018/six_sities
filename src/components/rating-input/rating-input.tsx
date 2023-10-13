import { ChangeEvent, Fragment } from 'react';
import { ArrRatingStars } from '../../const';

type RatingInputProps = {
  onElementChangeHandle: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isInactive: boolean;
};

export default function RatingInput({
  onElementChangeHandle,
  isInactive,
}: RatingInputProps): JSX.Element {
  return (
    <div className='reviews__rating-form form__rating'>
      {ArrRatingStars.map((itemRating) => (
        <Fragment key={itemRating}>
          <input
            className='form__rating-input visually-hidden'
            name='rating'
            value={itemRating}
            id={`${itemRating}-stars`}
            type='radio'
            onFocus={onElementChangeHandle}
            disabled={isInactive}
            alt='rating-star'
          />
          <label
            htmlFor={`${itemRating}-stars`}
            className='reviews__rating-label form__rating-label'
            title='perfect'
          >
            <svg className='form__star-image' width='37' height='33'>
              <use xlinkHref='#icon-star'></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}
