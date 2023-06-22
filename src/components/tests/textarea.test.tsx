import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../util/test';
import { TextArea } from '../textarea';
import '@testing-library/jest-dom';

const mockData = {
  text: 'We planted cabbage this morning!',
  errorMessage: 'There is an error'
};

describe('textArea component', () => {
  it('should render value', () => {
    renderWithProviders(<TextArea defaultValue={mockData.text} />);
    expect(screen.getByText(mockData.text)).toBeInTheDocument();
  });

  it('should render error styles when there is an error', () => {
    renderWithProviders(
      <TextArea
        defaultValue={mockData.text}
        hasError
        errorMessage={mockData.errorMessage}
      />
    );
    const textareaEl = screen.getByRole('textbox');
    expect(textareaEl).toHaveClass('border-error-500');
    expect(screen.getByText(mockData.text)).toBeInTheDocument();
  });
});
