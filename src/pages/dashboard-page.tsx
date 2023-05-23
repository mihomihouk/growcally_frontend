import React from 'react';
import { Feed } from '../container/feed';
import { Layout } from './layout';

export const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <Feed />
    </Layout>
  );
};
