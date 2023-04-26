import React from 'react';
import { Button } from '../components/button';

export const SignUpPage = () => {
  return (
    <div className="min-h-screen py-40 bg-gray-300">
      <div className="container mx-auto">
        <div className="flex flex-col w-10/12 lg:w-8/12 bg-white rounded-xl shadow-lg overflow-hidden mx-auto">
          <div className="flex flex-col lg:flex-row ">
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 pl-4 pt-4">
                <img
                  alt=""
                  src="img/text-no-bg.png"
                  className="w-[100px] h-[30px]"
                />
              </div>
              <div className="py-16 px-12">
                <h2 className="text-3xl mb-4">Welcome</h2>
                <p className="mb-4 text-gray-400">
                  Create your account. It’s free and only take a minute.
                </p>
                <form>
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="Firstname"
                      className="border border-gray-400 px-2 rounded-lg p-2"
                    />
                    <input
                      type="text"
                      placeholder="Surname"
                      className="border border-gray-400 px-2 rounded-lg p-2"
                    />
                  </div>
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
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="border border-gray-400 px-2 w-full rounded-lg p-2"
                    />
                  </div>
                  <div className="mt-5 flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="h-border border-gray-400 rounded-lg p-2 cursor-pointer h-4 w-4"
                    />
                    <div>
                      I accept the{' '}
                      <a href="#" className="text-gray-500 font-semibold">
                        Terms of Use
                      </a>{' '}
                      &{' '}
                      <a href="#" className="text-gray-500 font-semibold">
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Button className="!w-full bg-black text-white inline-block p-2 rounded-lg">
                      Register Now
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div
              className="w-full hidden lg:flex lg:w-1/2  flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: 'url("img/sign-up-background.png")'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
