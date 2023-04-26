// export default renderWithRedux;
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import modalsReducer from '../slices/modals-slice';
import postsReducer from '../slices/posts-slice';

import { AppStore, RootState, setupStore } from '../store/store';
// As a basic setup, import your same slice reducers
import { RenderOptions, render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper, ...renderOptions }) };
};
