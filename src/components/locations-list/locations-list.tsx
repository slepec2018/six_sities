import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { switchCity } from '../../store/app-data/app-data.slice';
import { getCurrentCity } from '../../store/app-data/app-data.selectors';

type LocationsListProps = {
  locations: string[];
};

export default function LocationsList({
  locations,
}: LocationsListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(getCurrentCity);

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {locations.map((city) => (
            <li
              className='locations__item'
              key={city}
              onClick={() => {
                dispatch(switchCity(`${city}`));
              }}
            >
              <Link
                className={`locations__item-link tabs__item ${
                  city === currentCity ? 'tabs__item--active' : ''
                }`}
                style={{ textDecoration: 'none' }}
                to='#'
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
