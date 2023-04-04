import React from "react";
import { InstagramLogo } from "../icons/instagram-logo";
import {
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../components/button";
import { ModalType } from "../interfaces/modal-type";
import { showModal } from "../slices/modal-slice";
import { useAppDispatch } from "../hooks/hooks";

export const DashboardNav: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <nav className="sm:w-1/3 md:w-1/6 py-10 px-3 flex flex-col justify-between">
      <div>
        <div className="h-[92px] text-center">
          <InstagramLogo className="mx-auto" />
        </div>
        <ul className="flex flex-col gap-8 mx-auto grow">
          <li>
            <Button className="flex gap-4" isMain>
              <HomeIcon className="h-6 w-6" />
              <p>Home</p>
            </Button>
          </li>
          <li>
            <Button className="flex gap-4" isMain>
              <MagnifyingGlassIcon className="h-6 w-6" />
              <p>Search</p>
            </Button>
          </li>
          <li>
            <Button
              className="flex gap-4"
              isMain
              onClick={() =>
                dispatch(showModal({ modalType: ModalType.CreatePost }))
              }
            >
              <PlusCircleIcon className="h-6 w-6" />
              <p>Create</p>
            </Button>
          </li>
          <li>
            <Button className="flex gap-4" isMain>
              <UserIcon className="h-6 w-6" />
              <p>Profile</p>
            </Button>
          </li>
        </ul>
      </div>

      <div>
        <Button className="flex gap-4" isMain>
          <Bars3Icon className="h-6 w-6" />
          <p>More</p>
        </Button>
      </div>
    </nav>
  );
};
