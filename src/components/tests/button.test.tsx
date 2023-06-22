import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/test';
import { Button } from '../button';
import { DASHBOARD_PATH } from '../../routes/routes';
import '@testing-library/jest-dom';

describe('Button component', () => {
  it('should render loading spinner', () => {
    renderWithProviders(<Button type="button" isLoading />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should render link', () => {
    renderWithProviders(<Button type="button" to={DASHBOARD_PATH} />);
    const buttonEl = screen.getByRole('link');
    expect(buttonEl.getAttribute('href')).toBe(`${DASHBOARD_PATH}`);
  });
});
