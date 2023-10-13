import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppSelector } from '../../hooks';
import LoadingPage from '../../pages/loading-page/loading-page';
import { getOffersDataLoadingStatus } from '../../store/app-data/app-data.selectors';

type AppProps = {
  locations: string[];
};

export default function App({ locations }: AppProps): JSX.Element {
  const isOffersLoading = useAppSelector(getOffersDataLoadingStatus);

  if (isOffersLoading) {
    return <LoadingPage />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route index element={<MainPage locations={locations} />} />
          <Route path={AppRoute.Room} element={<PropertyPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
