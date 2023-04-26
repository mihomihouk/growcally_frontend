import React from 'react';
import { DashboardNav } from '../container/dashboard-nav';
import { Feed } from '../container/feed';

const DashboardPage: React.FC = () => {
  return (
    <div className="h-full mx-auto flex flex-row">
      <DashboardNav />
      <Feed />
    </div>
  );
};

export default DashboardPage;
