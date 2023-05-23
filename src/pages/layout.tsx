import { DashboardNav } from '../container/dashboard-nav';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full mx-auto flex flex-row">
      <DashboardNav />
      <div className="sm:ml-1 md:!ml-16 lg:!ml-64 pt-10 px-2 md:px-12 lg:px-36 w-full">
        {children}
      </div>
    </div>
  );
};
