import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DASHBOARD_PATH, LOG_IN_PATH, SIGN_UP_PATH } from './routes';
import { DashboardNav } from './container/dashboard-nav';
import { LogInPage } from './pages/log-in-page';
import { SignUpPage } from './pages/sign-up-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={DASHBOARD_PATH} element={<DashboardNav />} />
      <Route path={LOG_IN_PATH} element={<LogInPage />}></Route>
      <Route path={SIGN_UP_PATH} element={<SignUpPage />}></Route>
    </Routes>
  );
};
