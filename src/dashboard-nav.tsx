import React from "react";
import { InstagramLogo } from "./icons/instagram-logo";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./components/button";

export const DashboardNav: React.FC = () => {
  return (
    <nav className="sm:w-1/3 md:w-1/6 ite pt-10 px-3 flex flex-col gap-16">
      <span className="mx-auto">
        <InstagramLogo />
      </span>
      <ul className="flex flex-col gap-8 mx-auto">
        <li>
          <Button>
            <HomeIcon className="h-6 w-6" />
          </Button>
        </li>
        <li>
          <Button>
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Button>
        </li>
        <li>
          <Button>
            <PlusCircleIcon className="h-6 w-6" />
          </Button>
        </li>
        <li>
          <Button>
            <UserIcon className="h-6 w-6" />
          </Button>
        </li>
      </ul>
    </nav>
  );
};
