import { useEffect, useState } from 'react';
import PlacesSorting from '../places-sorting/places-sorting';
import CitiesPlacesList from '../cities-places-list/cities-places-list';
import Map from '../map/map';
import { City, Offer, Offers } from '../../types/offers-type';
import { useAppSelector } from '../../hooks';
import {
  getErrorOffersStatus,
  getOffers,
} from '../../store/app-data/app-data.selectors';
import { toast } from 'react-toastify';
import { getCurrentCity } from '../../store/app-data/app-data.selectors';
import MainEmptyPage from '../../pages/main-empty-page/main-empty-page';

const getOffersOfcity = (offers: Offers, city: string) =>
  offers.filter((offer) => offer.city.name === city);

const getCityForMap = (offers: Offers, city: string) =>
  offers.find((offer) => offer.city.name === city)?.city;

export default function OffersListContainer(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [relevantOffers, setRelevantOffers] = useState<Offers>([]);

  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCurrentCity);

  const isErrorLoading = useAppSelector(getErrorOffersStatus);

  useEffect(() => {
    if (isErrorLoading) {
      toast.warning('Failed to load offers, please refresh the page.');
    }
  }, [isErrorLoading]);

  useEffect(() => {
    const currentOffers = getOffersOfcity(offers, city);
    setRelevantOffers(currentOffers);
  }, [city, offers]);

  if (!getOffersOfcity(offers, city).length) {
    return <MainEmptyPage city={city} />;
  }

  return (
    <div className='cities'>
      <div className='cities__places-container container'>
        <section className='cities__places places'>
          <h2 className='visually-hidden'>Places</h2>
          <b className='places__found' style={{ textAlign: 'left' }}>
            {relevantOffers.length} places to stay in {city}
          </b>
          <PlacesSorting />
          <CitiesPlacesList
            offers={relevantOffers}
            onMouseEnterHandler={(offer) => setActiveOffer(offer)}
          />
        </section>
        <div className='cities__right-section'>
          <Map
            city={getCityForMap(offers, city) as City}
            offers={relevantOffers}
            activeOffer={activeOffer}
            className={'cities'}
          />
        </div>
      </div>
    </div>
  );
}
