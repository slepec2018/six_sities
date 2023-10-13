import { useRef, useEffect, useState } from 'react';
import { FeatureGroup, Icon, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Offers, Offer, City } from '../../types/offers-type';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offers;
  activeOffer: Offer | null;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});
const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

export default function Map({
  city,
  offers,
  activeOffer,
  className,
}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const [markersGroup] = useState<FeatureGroup>(new FeatureGroup());

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          offer.id === activeOffer?.id ? currentCustomIcon : defaultCustomIcon
        );
        markersGroup.addLayer(marker);
      });

      if (activeOffer) {
        const marker = new Marker({
          lat: activeOffer.location.latitude,
          lng: activeOffer.location.longitude,
        });
        marker.setIcon(currentCustomIcon);
        markersGroup.addLayer(marker);
      }

      markersGroup.addTo(map);
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    return () => {
      markersGroup.clearLayers();
    };
  }, [map, offers, activeOffer, city, markersGroup]);

  return (
    <section
      className={`${className}__map map`}
      style={{ maxWidth: '1146px' }}
      ref={mapRef}
      data-testid='map'
    />
  );
}
