import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/test';
import { Thumbnail } from '../thumbnail';
import '@testing-library/jest-dom';

const mockData = {
  src: '/img/default-profile.jpg',
  alt: 'profile picture'
};

describe('Thumbnail component', () => {
  it.only('should render image properly', () => {
    renderWithProviders(<Thumbnail src={mockData.src} alt={mockData.alt} />);
    const imageEl = screen.getByAltText(mockData.alt);
    expect(imageEl).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockData.src);
  });
});
