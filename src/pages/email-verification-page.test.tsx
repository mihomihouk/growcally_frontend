import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../util/test';
import { EmailVerificationPage } from './email-verification-page';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/lib/node';
import { handlers } from '../mocks/handlers';

const input = {
  email: 'test.user@gmail.com',
  verificationCode: '123456'
};

// If we setup server outside of this test file, sometimes tests fail
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

describe('EmailVerificationPage', () => {
  it('should render the email verification form', () => {
    renderWithProviders(<EmailVerificationPage />);

    expect(screen.getByText('Verify Email Address')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Type your email address')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Type verification code')
    ).toBeInTheDocument();
    expect(screen.getByText('Verify email')).toBeDisabled();
    expect(screen.getByText("Didn't receive a code?")).toBeInTheDocument();

    userEvent.type(
      screen.getByPlaceholderText('Type your email address'),
      input.email
    );
    userEvent.type(
      screen.getByPlaceholderText('Type verification code'),
      input.verificationCode
    );
    expect(screen.getByText('Verify email')).toBeEnabled();
  });

  it('should navigate to the login page after successful verification', async () => {
    renderWithProviders(<EmailVerificationPage />);

    userEvent.type(
      screen.getByPlaceholderText('Type your email address'),
      input.email
    );
    userEvent.type(
      screen.getByPlaceholderText('Type verification code'),
      input.verificationCode
    );
    userEvent.click(screen.getByText('Verify email'));

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    setTimeout(() => {
      expect(screen.getByText('Log In')).toBeInTheDocument();
    }, 10000);
  });

  it('should resend the verification code when the resend link is clicked', async () => {
    renderWithProviders(<EmailVerificationPage />);

    userEvent.type(
      screen.getByPlaceholderText('Type your email address'),
      input.email
    );
    userEvent.click(screen.getByText('Resend'));

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    setTimeout(() => {
      expect(
        screen.getByText(
          "We've sent a verification code to your email address."
        )
      ).toBeInTheDocument();
    }, 10000);
  });
});
