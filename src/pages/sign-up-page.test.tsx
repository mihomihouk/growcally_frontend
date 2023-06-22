import { screen, waitFor } from '@testing-library/react';
import { SignUpPage } from './sign-up-page';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../util/test';
import '@testing-library/jest-dom/extend-expect';
import { handlers } from '../mocks/handlers';
import { setupServer } from 'msw/lib/node';

const input = {
  firstName: 'Grow',
  surname: 'Together',
  email: 'test.user@gmail.com',
  password: '!23456groW',
  invalidPassword: '1234567',
  missMatchPassword: '!23456gRow',
  invalidEmail: 'gmail.com'
};

const invalidPassword = '1234567';

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

describe('SignUpPage', () => {
  it('should render the signup form', async () => {
    renderWithProviders(<SignUpPage />);

    expect(screen.getByText('Register Now')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText('First name'), input.firstName);
    userEvent.type(screen.getByPlaceholderText('Surname'), input.surname);
    userEvent.type(screen.getByPlaceholderText('Email'), input.email);
    userEvent.type(screen.getByPlaceholderText('Password'), input.password);
    userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      input.password
    );
    await waitFor(() => expect(screen.getByRole('button')).toBeEnabled());
  });

  it('should show error messages for invalid password', () => {
    renderWithProviders(<SignUpPage />);

    // Enter an invalid password
    userEvent.type(screen.getByPlaceholderText('Password'), invalidPassword);
    userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      input.invalidPassword
    );
    userEvent.click(screen.getByRole('button'));

    // Verify error messages are displayed
    expect(
      screen.getByText('Must be at least 8 characters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Must contain at least 1 capital case')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Must contain at least 1 small case')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Must contain at least 1 special character')
    ).toBeInTheDocument();
  });

  it('should show error message for mismatched passwords', () => {
    renderWithProviders(<SignUpPage />);

    userEvent.type(screen.getByPlaceholderText('Password'), input.password);
    userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      input.missMatchPassword
    );
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Password does not match')).toBeInTheDocument();
  });

  it('should show error message for invalid email', () => {
    renderWithProviders(<SignUpPage />);

    screen.getByPlaceholderText('Email');

    // Enter an invalid email address
    userEvent.type(screen.getByPlaceholderText('Email'), input.invalidEmail);

    // Verify error message is displayed
    expect(screen.getByText('Enter valid email address')).toBeInTheDocument();
  });

  it('should call registerUser and navigate to verify page on successful registration', async () => {
    renderWithProviders(<SignUpPage />);

    // Fill in the form fields
    userEvent.type(screen.getByPlaceholderText('First name'), input.firstName);
    userEvent.type(screen.getByPlaceholderText('Surname'), input.surname);
    userEvent.type(screen.getByPlaceholderText('Email'), input.email);
    userEvent.type(screen.getByPlaceholderText('Password'), input.password);
    userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      input.password
    );

    userEvent.click(screen.getByText('Register Now'));

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    setTimeout(() => {
      expect(screen.getByText('Verify Email Address')).toBeInTheDocument();
    }, 10000);
  });
});
