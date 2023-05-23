import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  PERSONAL_PATH,
  DASHBOARD_PATH,
  LANDING_PATH,
  LOG_IN_PATH,
  SIGN_UP_PATH,
  VERIFICATION_PATH
} from './routes';
import { LogInPage } from '../pages/log-in-page';
import { SignUpPage } from '../pages/sign-up-page';
import { DashboardPage } from '../pages/dashboard-page';
import { LandingPage } from '../pages/landing-page';
import { EmailVerificationPage } from '../pages/email-verification-page';
import SecureRoute from './secure-route';
import { NotFoundPage } from '../pages/404-page';
import { PersonalPage } from '../pages/personal-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={LANDING_PATH} element={<LandingPage />} />
      <Route
        path={DASHBOARD_PATH}
        element={
          <SecureRoute>
            <DashboardPage />
          </SecureRoute>
        }
      />
      <Route
        path={PERSONAL_PATH}
        element={
          <SecureRoute>
            <PersonalPage />
          </SecureRoute>
        }
      />
      <Route path={LOG_IN_PATH} element={<LogInPage />} />
      <Route path={SIGN_UP_PATH} element={<SignUpPage />} />
      <Route path={VERIFICATION_PATH} element={<EmailVerificationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
