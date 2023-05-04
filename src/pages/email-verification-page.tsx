import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOG_IN_PATH } from '../routes';
import { FadeLoader } from 'react-spinners';
import classNames from 'classnames';
import { resendVerificationCode, verifyEmail } from '../api/auth.service';

const spinnerOverride: CSSProperties = {
  margin: '0 auto'
};

export const EmailVerificationPage: React.FC = () => {
  const [verificationCode, setVerificationCode] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [resendIsLoading, setResendIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const verifyUserParams = {
        email,
        verificationCode
      };
      await verifyEmail(verifyUserParams);
      setIsLoading(false);
      navigate(LOG_IN_PATH);
    } catch (error) {
      console.log(error);
      //TODO: show error message to the user
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendIsLoading(true);
    try {
      await resendVerificationCode(email);
      setResendIsLoading(false);
    } catch (error) {
      setResendIsLoading(false);
    }
  };

  const isDisabled = !verificationCode;
  return (
    <div className="bg-ct-blue-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <div className="mx-auto flex flex-col gap-7 mb-7 w-full">
          <img
            alt="Verify email"
            src="/img/verify-email.png"
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
          {!isLoading ? (
            <button
              className={classNames(
                'w-full bg-primary-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75',
                {
                  'cursor-not-allowed': isDisabled
                }
              )}
              type="submit"
              disabled={isDisabled}
            >
              Verify email
            </button>
          ) : (
            <FadeLoader
              loading={isLoading}
              height={10}
              width={10}
              cssOverride={spinnerOverride}
              aria-label="Loading Spinner"
            />
          )}
          {!resendIsLoading ? (
            <p className="text-center">
              Didn't receive a code?{' '}
              <span
                className="text-primary-500 cursor-pointer"
                onClick={handleResendCode}
              >
                Resend
              </span>
            </p>
          ) : (
            <p className="text-center">
              We're sending verification code to your email address again...
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
