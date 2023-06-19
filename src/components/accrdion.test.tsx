import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../util/test';
import { Accordion } from './accordion';
import '@testing-library/jest-dom';

const mockData = {
  title: 'Accessibility',
  headerColorTheme: 'red'
};

describe('Accordion component', () => {
  it('should render title', () => {
    renderWithProviders(
      <Accordion title={mockData.title}>accordion children</Accordion>
    );
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
    expect(screen.getByText(`${mockData.title}`)).toBeInTheDocument();
  });

  it('should toggle on clicking', () => {
    renderWithProviders(
      <Accordion title={mockData.title}>accordion children</Accordion>
    );
    const buttonEl = screen.getByRole('button');
    expect(screen.queryByText('accordion children')).not.toBeInTheDocument();
    fireEvent.click(buttonEl);
    expect(screen.getByText('accordion children')).toBeInTheDocument();
  });
});
