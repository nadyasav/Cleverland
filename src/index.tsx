import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './layouts/layout';
import { LayoutAuth } from './layouts/layout-auth/layout-auth';
import { LayoutMain } from './layouts/layout-main/layout-main';
import { Auth } from './pages/auth/auth';
import { BookPage } from './pages/book/book-page';
import { MainPage } from './pages/main/main-page';
import { Registration } from './pages/registration/registration';
import { Terms } from './pages/terms/terms';
import { AuthProtectedRoutes } from './routing/auth-protected-routes';
import { AuthRoutes } from './routing/auth-routes';
import { PassRoute } from './routing/pass-route';
import { store } from './store/store';
import { ROUTES, TERMS } from './constants';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route element={<LayoutAuth />}>
              <Route path={ROUTES.auth} element={<Auth />} />
              <Route path={ROUTES.registration} element={<Registration />} />
              <Route path='/forgot-pass/' element={<PassRoute />} />
            </Route>
          </Route>
          <Route element={<AuthProtectedRoutes />}>
            <Route path='/' element={<Layout />}>
              <Route element={<LayoutMain />}>
                <Route path='/' element={<Navigate to='/books/all' />} />
                <Route path='/books' element={<Navigate to='/books/all' />} />
                <Route path='/books/:category' element={<MainPage />} />
                <Route path='/terms' element={<Terms contentView={TERMS.terms} />} />
                <Route path='/contract' element={<Terms contentView={TERMS.contract} />} />
              </Route>
              <Route path='/books/:category/:bookId' element={<BookPage />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
