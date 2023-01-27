import React, { lazy, Suspense } from 'react';
import {
  ActionFunction,
  LoaderFunction,
  Route,
  Routes,
  ShouldRevalidateFunction,
} from 'react-router-dom';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import PrivateRoute from './PrivateRoute';
import ErrorPage from './../screens/ErrorPage';
import Loader from '../components/Loader';

interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;

  shouldRevalidate?: ShouldRevalidateFunction;
}
/**
 * * Router
 * @returns {JSX.Element}
 */

const Navigation: React.FC<RouteObject> = (): JSX.Element => {
  return (
    <Suspense fallback={<Loader type={'blank'} color={''} />}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default Navigation;
