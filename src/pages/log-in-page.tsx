import React from 'react';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { SIGN_UP_PATH } from '../routes';

export const LogInPage = () => {
  return (
    <div className="min-h-screen py-40 bg-gray-300">
      <div className="container mx-auto">
        <div className="flex flex-col w-10/12 lg:w-8/12 bg-white rounded-xl shadow-lg overflow-hidden mx-auto">
          <div className="flex flex-col lg:flex-row ">
            <div className="w-full lg:w-1/2 ">
              <div className="flex items-center gap-4 pl-4 pt-4">
                <img
                  alt="growcally logo"
                  src="img/text-no-bg.png"
                  className="w-[100px] h-[25px]"
                />
              </div>
              <div className="py-16 px-12">
                <h2 className="text-3xl mb-4">Welcome back</h2>
                <p className="mb-4 text-gray-400">
                  Welcome back! Please enter your details.
                </p>
                <form>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Email"
                      className="border border-gray-400 px-2 rounded-lg w-full p-2"
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="password"
                      placeholder="Password"
                      className="border border-gray-400 px-2 w-full rounded-lg p-2"
                    />
                  </div>

                  <div className="mt-5">
                    <Button className="w-full bg-black text-white inline-block p-2 rounded-lg hover:bg-opacity-75">
                      Log In
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-5 text-center">
                    Don't have an account?
                    <Link
                      className="ml-2 text-black font-semibold cursor-pointer"
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
              src="img/sign-up-background.png"
              className="w-full hidden lg:flex lg:w-1/2  flex-col items-center justify-center bg-no-repeat bg-cover bg-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
