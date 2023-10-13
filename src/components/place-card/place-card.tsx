import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers-type';
import { getStarsOfRating } from '../../get-stars-of-rating';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnterHandler: (offer: Offer | null) => void;
};

export default function PlaceCard({
  offer,
  onMouseEnterHandler,
}: PlaceCardProps): JSX.Element {
  const { isPremium, price, title, previewImage, type } = offer;
  const rating = Math.round(offer.rating);

  return (
    <article
      role='listitem'
      aria-label='place-card'
      className='cities__card place-card'
      style={{ textAlign: 'left' }}
      onMouseEnter={() => onMouseEnterHandler(offer)}
      onMouseLeave={() => onMouseEnterHandler(null)}
    >
      {isPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link to={`/offer/${offer.id}`}>
          <img
            className='place-card__image'
            src={previewImage}
            alt=''
            width='260'
            height='200'
          />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${getStarsOfRating(rating)}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link style={{ textDecoration: 'none' }} to={`/offer/${offer.id}`}>
            {title}
          </Link>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
}
