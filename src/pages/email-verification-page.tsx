import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOG_IN_PATH } from '../routes/routes';
import classNames from 'classnames';
import { resendVerificationCode, verifyEmail } from '../api/auth.service';
import { Button } from '../components/button';

export const EmailVerificationPage: React.FC = () => {
  const [verificationCode, setVerificationCode] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [resendIsLoading, setResendIsLoading] = React.useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const verifyUserParams = {
      email,
      verificationCode
    };
    const { isSuccess, alertMessage } = await verifyEmail(verifyUserParams);
    if (!isSuccess) {
      setIsLoading(false);
      alert(alertMessage);
      return;
    }
    navigate(LOG_IN_PATH);
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setResendIsLoading(true);
    const { alertMessage, isSuccess } = await resendVerificationCode(email);
    if (!isSuccess) {
      alert(alertMessage);
      setResendIsLoading(false);
      return;
    }
    setResendIsLoading(false);
    setResendSuccess(true);
  };

  const isDisabled = !verificationCode;
  return (
    <div className="bg-ct-blue-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <div className="mx-auto flex flex-col gap-7 mb-7 w-full">
          <img
            alt="Verify email"
            src="/img/verify-email.jpg"
            className="h-[150px] w-[150px] block mx-auto"
          />
          <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-yellow-600">
            Verify Email Address
          </h1>
          <p className="text-lg lg:text-xl text-center font-medium text-ct-yellow-600 text-gray-400">
            Enter the six digit code we sent to your email address to verify
            your new account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5 bg-gray-400"
        >
          <input
            name="email"
            type="text"
            placeholder="Type your email address"
            className="block w-full rounded-2xl py-2 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="verification Code"
            type="text"
            placeholder="Type verification code"
            className="block w-full rounded-2xl py-2 px-4"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button
            className={classNames(
              'w-full bg-primary-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75',
              {
                'cursor-not-allowed': isDisabled
              }
            )}
            type="submit"
            disabled={isDisabled}
            isLoading={isLoading}
          >
            Verify email
          </Button>
          {!resendSuccess ? (
            <p className="text-center">
              Didn't receive a code?{' '}
              <Button
                type="button"
                className="text-primary-500 cursor-pointer"
                isLoading={resendIsLoading}
                onClick={handleResendCode}
              >
                Resend
              </Button>
            </p>
          ) : (
            <p className="text-center">
              We've sent a verification code to your email address.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
