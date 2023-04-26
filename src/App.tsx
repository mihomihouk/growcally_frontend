import React from 'react';
import './index.css';
import { ModalsContainer } from './container/modals-container';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <>
      <AppRoutes />
      <ModalsContainer />
    </>
  );
}

export default App;
