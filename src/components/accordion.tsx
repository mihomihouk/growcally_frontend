import classNames from 'classnames';
import React from 'react';
import { Button } from './button';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
interface AccordionProps {
  title: string;
  headerColorTheme?: string;
  children?: React.ReactNode;
}
export const Accordion: React.FC<AccordionProps> = ({
  title,
  headerColorTheme,
  children
}) => {
  const [isOpen, toggleAccordion] = React.useState(false);
  return (
    <div>
      <div className="flex justify-between py-[14px] items-center">
        <p className={classNames(`text-base text-${headerColorTheme}`)}>
          {title}
        </p>
        <Button onClick={() => toggleAccordion((s) => !s)} type="button">
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-white hover:text-gray-300" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-white hover:text-gray-300" />
          )}
        </Button>
      </div>
      {isOpen && children && <>{children}</>}
    </div>
  );
};
