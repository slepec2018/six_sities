import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/offers-type';
import { useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getErrorNearOffersStatus } from '../../store/app-data/app-data.selectors';

type NearPlacesListProps = {
  offers: Offers;
};

export default function NearPlacesList({
  offers,
}: NearPlacesListProps): JSX.Element {
  const isErrorLoading = useAppSelector(getErrorNearOffersStatus);

  useEffect(() => {
    if (isErrorLoading) {
      toast.warning(
        'Failed to load other places in the neighbourhood, please refresh the page.'
      );
    }
  }, [isErrorLoading]);

  return (
    <div
      className='near-places__list places__list'
      data-testid='near-places-list'
    >
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onMouseEnterHandler={(evt) => evt}
        />
      ))}
    </div>
  );
}
