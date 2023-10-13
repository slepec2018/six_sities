import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import Map from '../../components/map/map';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import { getStarsOfRating } from '../../get-stars-of-rating';
import UsersReviews from '../../components/users-reviews/users-reviews';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchNearOffersAction,
  fetchOfferAction,
  fetchReviewsAction,
} from '../../store/api-action';
import LoadingPage from '../loading-page/loading-page';
import {
  getErrorOfferStatus,
  getNearOffers,
  getOffer,
} from '../../store/app-data/app-data.selectors';
import { getItemPluralFormatted } from '../../general';

export default function PropertyPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams() as { id: string };

  const hotelId = Number(id);

  useEffect(() => {
    dispatch(fetchOfferAction({ id: hotelId }));
    dispatch(fetchNearOffersAction({ id: hotelId }));
    dispatch(fetchReviewsAction({ id: hotelId }));
  }, [dispatch, hotelId]);

  const hasErrorOffer = useAppSelector(getErrorOfferStatus);
  const offer = useAppSelector(getOffer);
  const nearOffers = useAppSelector(getNearOffers);

  if (hasErrorOffer) {
    return <NotFoundPage />;
  }

  if (!offer) {
    return <LoadingPage />;
  }

  const {
    images,
    isPremium,
    type,
    title,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    city,
  } = offer;

  return (
    <>
      <Helmet>
        <title>6/Cities.Room</title>
      </Helmet>

      <main className='page__main page__main--property'>
        <section className='property'>
          <div className='property__gallery-container container'>
            <div className='property__gallery'>
              {images.slice(0, 6).map((image) => (
                <div className='property__image-wrapper' key={image}>
                  <img className='property__image' src={image} alt='' />
                </div>
              ))}
            </div>
          </div>
          <div className='property__container container'>
            <div className='property__wrapper'>
              {isPremium && (
                <div className='property__mark'>
                  <span>Premium</span>
                </div>
              )}
              <div className='property__name-wrapper'>
                <h1 className='property__name'>{title}</h1>
              </div>
              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span
                    style={{
                      width: `${getStarsOfRating(Math.round(rating))}%`,
                    }}
                  />
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>
                  {rating}
                </span>
              </div>
              <ul className='property__features'>
                <li className='property__feature property__feature--entire'>
                  {type}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {bedrooms} {`${getItemPluralFormatted('Bedroom', bedrooms)}`}
                </li>
                <li className='property__feature property__feature--adults'>
                  Max {maxAdults}{' '}
                  {`${getItemPluralFormatted('adult', maxAdults)}`}
                </li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <div className='property__inside'>
                <h2 className='property__inside-title'>What&apos;s inside</h2>
                <ul className='property__inside-list'>
                  {goods.map((good) => (
                    <li className='property__inside-item' key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                    <img
                      className='property__avatar user__avatar'
                      src={host.avatarUrl}
                      width='74'
                      height='74'
                      alt=''
                    />
                  </div>
                  <span className='property__user-name'> {host.name} </span>
                  {host.isPro && (
                    <span className='property__user-status'> Pro </span>
                  )}
                </div>
                <div className='property__description'>
                  <p
                    className='property__text'
                    style={{ textAlign: 'left', hyphens: 'auto' }}
                  >
                    {description}
                  </p>
                </div>
              </div>
              <UsersReviews />
            </div>
          </div>
          <section
            className='property__map map'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Map
              city={city}
              offers={[...nearOffers, offer]}
              activeOffer={offer}
              className={'property'}
            />
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            <NearPlacesList offers={nearOffers} />
          </section>
        </div>
      </main>
    </>
  );
}
