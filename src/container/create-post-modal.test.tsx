import { act, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../util/test';
import { Node } from 'typescript';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: Node) => node
}));

const mockData = (files: File[]) => {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file
      })),
      types: ['Files']
    }
  };
};

test('Should allow uploading media on drag and drop', async () => {
  renderWithProviders(
    <div>
      <App />
      <div id="portal"></div>
    </div>
  );
  expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  const createButtonEl = screen.getByText('Create');
  fireEvent.click(createButtonEl);
  expect(screen.getByTestId('modal')).toBeInTheDocument();
  expect(screen.getByText('Drag photos and videos here')).toBeInTheDocument();

  const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
    type: 'application/json'
  });
  const data = mockData([file]);
  const mockOnDrop = jest.fn();

  const dropZoneEl = screen.getByTestId('drop-zone');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    fireEvent.dragEnter(dropZoneEl, data);
    fireEvent.drop(dropZoneEl, data);
  });
  // Wait for a short delay to allow the drag and drop event to propagate
  setTimeout(() => {
    expect(mockOnDrop).toHaveBeenCalledTimes(1);
    // Following mock.calls[0][0][0] refers to the first file in that array,
    // and we assert its name property to ensure that the correct file was uploaded.
    expect(mockOnDrop.mock.calls[0][0][0].name).toEqual(file.name);
    expect(
      screen.getByRole('img', { name: 'accepted file' })
    ).toBeInTheScreen();
  }, 100);
});
