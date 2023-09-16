import { Outlet } from 'react-router-dom';

import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

export const Layout = () => (
  <div className='layout'>
    <Header />
    <main className='main'>
      <Outlet />
    </main>
    <Footer />
  </div>
);
