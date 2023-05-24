import React from 'react';
import {
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../components/button';
import { ModalType } from '../interfaces/modal-type';
import { showModal } from '../slices/modals-slice';
import { useAppDispatch } from '../hooks/hooks';
import { LeafNoFillWhite } from '../icons/leaf-no-fill-white';
import { DASHBOARD_PATH } from '../routes/routes';

export const DashboardNav: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <aside className="fixed bottom-0 left-0 right-0 md:top-0 md:w-16 lg:w-64 bg-gray-800 text-white z-10">
      <nav className="flex py-3 lg:py-10 px-3 flex-row md:flex-col justify-between w-full h-full">
        <div>
          <div className="h-[92px] text-center hidden md:block">
            <img
              className="hidden lg:inline-block"
              alt="growcally logo"
              src="img/text-logo-white.png"
            />
          </div>
          <ul className="flex flex-row md:flex-col gap-8 mx-auto grow">
            <li>
              <Button
                type="button"
                className="flex gap-4"
                inNav
                to={DASHBOARD_PATH}
              >
                <HomeIcon className="h-6 w-6 mx-auto lg:!mx-0" />
                <p className="hidden lg:block">Home</p>
              </Button>
            </li>
            <li>
              <Button type="button" className="flex gap-4" inNav>
                <MagnifyingGlassIcon className="h-6 w-6 mx-auto lg:!mx-0" />
                <p className="hidden lg:block">Search</p>
              </Button>
            </li>
            <li>
              <Button
                className="flex gap-4"
                type="button"
                inNav
                onClick={() =>
                  dispatch(showModal({ modalType: ModalType.CreatePost }))
                }
              >
                <PlusCircleIcon className="h-6 w-6 mx-auto lg:!mx-0" />
                <p className="hidden lg:block">Create</p>
              </Button>
            </li>
            <li>
              <Button type="button" className="flex gap-4" inNav>
                <LeafNoFillWhite
                  className="h-6 w-6 mx-auto lg:!mx-0"
                  fill="white"
                />
                <p className="hidden lg:block">Likes</p>
              </Button>
            </li>
          </ul>
        </div>

        <div>
          <Button
            type="button"
            className="flex gap-4"
            inNav
            onClick={() =>
              dispatch(showModal({ modalType: ModalType.AccountAction }))
            }
          >
            <Bars3Icon className="h-6 w-6 mx-auto lg:!mx-0" />
            <p className="hidden lg:block">More</p>
          </Button>
        </div>
      </nav>
    </aside>
  );
};
