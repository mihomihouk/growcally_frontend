import React from 'react';
import { Button } from '../components/button';
import { Link, useNavigate } from 'react-router-dom';
import { DASHBOARD_PATH, SIGN_UP_PATH } from '../routes/routes';
import { loginUser } from '../api/auth.service';

export const LogInPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value.trim();
    setEmail(emailInput);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const params = {
      email,
      password
    };
    const { isSuccess, alertMessage } = await loginUser(params);

    if (!isSuccess) {
      setIsLoading(false);
      alert(alertMessage);
      return;
    }

    navigate(DASHBOARD_PATH);
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen py-40 bg-gray-300">
      <div className="container mx-auto">
        <div className="flex flex-col w-10/12 lg:w-8/12 rounded-xl bg-gray-100 shadow-lg overflow-hidden mx-auto">
          <div className="flex flex-col lg:flex-row ">
            <div className="w-full lg:w-1/2 ">
              <div className="flex items-center gap-4 pl-4 pt-4">
                <img alt="growcally logo" src="img/text-logo-black.jpg" />
              </div>
              <div className="py-16 px-12">
                <h2 className="text-3xl mb-4">Welcome back</h2>
                <p className="mb-4 text-gray-800">
                  Welcome back! Please enter your details.
                </p>
                <form>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Email"
                      className="border border-gray-400 px-2 rounded-lg w-full p-2"
                      value={email}
                      onChange={(e) => handleEmailInput(e)}
                    />
                  </div>
                  {emailError && (
                    <p className="text-error-500 text-sm">
                      Enter valid email address
                    </p>
                  )}
                  <div className="mt-5">
                    <input
                      type="password"
                      placeholder="Password"
                      className="border border-gray-400 px-2 w-full rounded-lg p-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
                    <Button
                      isPrimary
                      disabled={!email || !password}
                      onClick={handleLogin}
                      type="submit"
                      isLoading={isLoading}
                    >
                      Log In
                    </Button>
                  </div>
                  <p className="text-sm text-gray-800 mt-5 text-center">
                    Don't have an account?
                    <Link
                      className="ml-2 text-primary-700 font-semibold cursor-pointer"
                      to={SIGN_UP_PATH}
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <img
              alt="watering plants"
              src="img/sign-up-background.jpg"
              className="w-full hidden lg:flex lg:w-1/2  flex-col items-center justify-center bg-no-repeat bg-cover bg-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
