import ItemReview from '../item-review/item-review';
import FormRewiew from '../form-review/form-review';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import {
  getErrorReviewStatus,
  getReviews,
} from '../../store/review-data/review-data.selectors';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Reviews } from '../../types/review-type';
import { getItemPluralFormatted } from '../../general';

const getNewReviews = (reviews: Reviews) => [...reviews].reverse().slice(0, 10);

export default function UsersReviews(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getReviews);

  const newReviews = getNewReviews(reviews);

  const isErrorLoading = useAppSelector(getErrorReviewStatus);

  useEffect(() => {
    if (isErrorLoading) {
      toast.warning('Failed to load comments, please refresh the page.');
    }
  }, [isErrorLoading]);

  return (
    <section className='property__reviews reviews' data-testid='reviews'>
      <h2 className='reviews__title'>
        {getItemPluralFormatted('Review', reviews.length)} &middot;{' '}
        <span className='reviews__amount'>{reviews.length}</span>
      </h2>

      <ul className='reviews__list'>
        {newReviews.map((review) => (
          <ItemReview review={review} key={review.id} />
        ))}
      </ul>

      {authStatus === AuthorizationStatus.Auth && <FormRewiew />}
    </section>
  );
}
