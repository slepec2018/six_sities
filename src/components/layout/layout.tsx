import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../logo/logo';
import ProfileSection from '../profile-section/profile-section';
import { getClassNameForLayout } from '../../general';

export default function Layout(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <div className={`${getClassNameForLayout(pathname)}`}>
      <header className='header'>
        <div className='container' data-testid='layout-container'>
          <div className='header__wrapper'>
            <Logo />
            <ProfileSection />
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
