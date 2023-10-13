import PlaceCard from '../place-card/place-card';
import { Offer, Offers } from '../../types/offers-type';
import { getSortingBy } from '../../general';
import { useAppSelector } from '../../hooks';
import { getOptionSorting } from '../../store/app-data/app-data.selectors';

type CitiesPlacesListProps = {
  offers: Offers;
  onMouseEnterHandler: (offer: Offer | null) => void;
};

export default function CitiesPlacesList({
  offers,
  onMouseEnterHandler,
}: CitiesPlacesListProps): JSX.Element {
  const currentOption = useAppSelector(getOptionSorting);

  const sortingOffers = getSortingBy(offers, currentOption) as Offers;

  return (
    <div
      className='cities__places-list places__list tabs__content'
      data-testid='cities-places-list'
    >
      {sortingOffers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onMouseEnterHandler={onMouseEnterHandler}
        />
      ))}
    </div>
  );
}
