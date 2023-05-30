import { DashboardNav } from '../container/dashboard-nav';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full mx-auto flex flex-row">
      <DashboardNav />
      {children}
    </div>
  );
};
