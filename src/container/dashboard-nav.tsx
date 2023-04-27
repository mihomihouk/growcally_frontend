import React from 'react';
import {
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Button } from '../components/button';
import { ModalType } from '../interfaces/modal-type';
import { showModal } from '../slices/modals-slice';
import { useAppDispatch } from '../hooks/hooks';
import { VerticalDivider } from '../components/vertical-divider';

export const DashboardNav: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="fixed top-0 left-0 sm:w-[200px] md:w-[200px] h-full justify-between flex flex-row">
      <nav className="flex py-10 px-3 flex-col justify-between w-full">
        <div>
          <div className="h-[92px] text-center">
            <img alt="growcally logo" src="img/text-logo-black.png" />
          </div>
          <ul className="flex flex-col gap-8 mx-auto grow">
            <li>
              <Button className="flex gap-4" inNav>
                <HomeIcon className="h-6 w-6" />
                <p>Home</p>
              </Button>
            </li>
            <li>
              <Button className="flex gap-4" inNav>
                <MagnifyingGlassIcon className="h-6 w-6" />
                <p>Search</p>
              </Button>
            </li>
            <li>
              <Button
                className="flex gap-4"
                inNav
                onClick={() =>
                  dispatch(showModal({ modalType: ModalType.CreatePost }))
                }
              >
                <PlusCircleIcon className="h-6 w-6" />
                <p>Create</p>
              </Button>
            </li>
            <li>
              <Button className="flex gap-4" inNav>
                <UserIcon className="h-6 w-6" />
                <p>Profile</p>
              </Button>
            </li>
          </ul>
        </div>

        <div>
          <Button className="flex gap-4" inNav>
            <Bars3Icon className="h-6 w-6" />
            <p>More</p>
          </Button>
        </div>
      </nav>
      <VerticalDivider borderColor="border-gray" />
    </div>
  );
};
