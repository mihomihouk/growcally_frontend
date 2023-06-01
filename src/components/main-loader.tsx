import React, { CSSProperties } from 'react';
import { PropagateLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

export const MainLoader = () => {
  return (
    <div className="w-full h-full flex items-center" data-testid="main loader">
      <PropagateLoader
        size={30}
        cssOverride={override}
        aria-label="Loading Spinner"
      />
    </div>
  );
};
