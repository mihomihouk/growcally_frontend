import React from 'react';
import { registerUser } from '../api/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { LOG_IN_PATH } from '../routes/routes';

export const SignUpPage = () => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [passwordErrors, setPasswordErrors] = React.useState<string[]>([]);
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const signUpParams = {
      firstName,
      surname,
      email,
      password,
      confirmPassword
    };
    const { alertMessage, isSuccess } = await registerUser(signUpParams);

    if (!isSuccess) {
      setIsLoading(false);
      alert(alertMessage);
      return;
    }

    navigate('/verify');
    setIsLoading(false);
  };

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

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value.trim();
    setPassword(passwordInput);
    let errors = [];
    const hasNumber = /\d/;
    const hasCapitalCase = /[A-Z]/;
    const hasSmallCase = /[a-z]/;
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (passwordInput.length < 8) {
      errors.push('Must be at least 8 characters');
    }
    if (!hasNumber.test(passwordInput)) {
      errors.push('Must contain at least 1 number');
    }
    if (!hasCapitalCase.test(passwordInput)) {
      errors.push('Must contain at least 1 capital case');
    }
    if (!hasSmallCase.test(passwordInput)) {
      errors.push('Must contain at least 1 small case');
    }
    if (!hasSpecialChar.test(passwordInput)) {
      errors.push('Must contain at least 1 special character');
    }
    setPasswordErrors(errors.length ? errors : []);
  };

  const handleConfirmPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmInput = e.target.value.trim();
    setConfirmPassword(confirmInput);
    if (confirmInput !== password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };

  const isDisabled =
    !firstName ||
    !firstName ||
    !email ||
    !password ||
    !confirmPassword ||
    emailError ||
    Boolean(passwordErrors.length) ||
    confirmPasswordError ||
    isLoading;
  return (
    <div className="min-h-screen py-40 bg-gray-300">
      <div className="container mx-auto">
        <div className="flex flex-col w-10/12 lg:w-8/12 bg-gray-100 rounded-xl shadow-lg overflow-hidden mx-auto">
          <div className="flex flex-col lg:flex-row ">
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 pl-4 pt-4">
                <img alt="growcally logo" src="img/text-logo-black.png" />
              </div>
              <div className="py-16 px-12">
                <h2 className="text-3xl mb-4">Welcome</h2>
                <p className="mb-4 text-gray-800">
                  Create your account. It’s free and only take a minute.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="First name"
                      className="border border-gray-400 px-2 rounded-lg p-2"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value.trim())}
                    />
                    <input
                      type="text"
                      placeholder="Surname"
                      className="border border-gray-400 px-2 rounded-lg p-2"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value.trim())}
                    />
                  </div>
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
                      onChange={(e) => handlePasswordInput(e)}
                    />
                  </div>
                  {passwordErrors &&
                    passwordErrors.map((error, index) => (
                      <p className="text-error-500 text-sm" key={index}>
                        {error}
                      </p>
                    ))}

                  <div className="mt-5">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="border border-gray-400 px-2 w-full rounded-lg p-2"
                      value={confirmPassword}
                      onChange={(e) => handleConfirmPasswordInput(e)}
                    />
                  </div>
                  {confirmPasswordError && (
                    <p className="text-error-500 text-sm">
                      Password does not match
                    </p>
                  )}
                  <div className="mt-5">
                    <Button
                      isPrimary
                      type="submit"
                      disabled={isDisabled}
                      isLoading={isLoading}
                    >
                      Register Now
                    </Button>
                  </div>
                  <p className="text-sm text-gray-800 mt-5 text-center">
                    Already have an account?
                    <Link
                      className="ml-2 text-primary-700 font-semibold cursor-pointer"
                      to={LOG_IN_PATH}
                    >
                      Log in
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
