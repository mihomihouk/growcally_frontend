import { screen } from '@testing-library/react';
import { renderWithProviders } from '../util/test';
import { LogInPage } from './log-in-page';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/lib/node';
import { handlers } from '../mocks/handlers';

const input = {
  email: 'test.user@gmail.com',
  password: '!23456groW'
};

const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('LogInPage', () => {
  it('should render the login form', () => {
    renderWithProviders(<LogInPage />);

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();

    expect(screen.getByText('Log In')).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText('Email'), input.email);
    userEvent.type(screen.getByPlaceholderText('Password'), input.password);
  });
});
