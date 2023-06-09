import React from 'react';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { LOG_IN_PATH, SIGN_UP_PATH } from '../routes/routes';

export const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover flex max-w-full"
      style={{ backgroundImage: 'url("img/landing-page-bg.jpg")' }}
    >
      <div className="lg:w-1/2 flex flex-col max-auto px-5 lg:pl-12">
        <img
          alt="growcally logo"
          src="img/text-logo-white.png"
          className="h-[50px] w-[200px] pt-4 relative z-10"
        />
        <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-black to-transparent"></div>
        <div className="pt-16 flex flex-col gap-4 items-start relative z-10">
          <p className="text-white font-bold text-3xl">Be a local grower</p>
          <h1 className="text-white font-bold text-6xl">
            Grow your own food,
            <br />
            share the joy
          </h1>
          <Button
            className="w-full md:!w-48 h-10 bg-primary-700 text-white inline-block p-2 rounded-lg hover:bg-opacity-75"
            to={SIGN_UP_PATH}
            type="button"
          >
            Start growing
          </Button>
          <p className="text-sm text-white font-semibold text-center">
            Already have an account?
            <Link
              className="ml-2 text-primary-700 font-semibold cursor-pointer hover:opacity-70"
              to={LOG_IN_PATH}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 lg:block hidden"></div>
    </div>
  );
};
