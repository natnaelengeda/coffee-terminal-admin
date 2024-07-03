import React from 'react';
import { NavLink } from "react-router-dom";

// Icons

import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown
} from "react-icons/md";
import SidebarLinkGroup from "../SidebarLinkGroup";

interface ISingleButtons {
  icon: any;
  name: string;
  link: string;
  linkName: string
  pathname: string;
  sidebarExpanded: boolean;
  setSidebarExpanded: (value: boolean) => void;
  routes: any[],
}

export default function DropdownButton({ icon, name, link, linkName, pathname, sidebarExpanded, setSidebarExpanded, routes }: ISingleButtons) {
  return (
    <SidebarLinkGroup
      activeCondition={
        pathname === link || pathname.includes(linkName)
      }>
      {(handleClick, open) => {
        return (
          <React.Fragment>
            <NavLink
              to="#"
              className={`group relative flex items-center justify-between gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                pathname.includes('dashboard')) &&
                'bg-graydark dark:bg-meta-4'
                }`}
              onClick={(e) => {
                e.preventDefault();
                sidebarExpanded
                  ? handleClick()
                  : setSidebarExpanded(true);
              }}>

              <div className="flex flex-row items-center gap-2">
                {icon}
                {name}
              </div>
              {
                open ?
                  <MdOutlineKeyboardArrowUp className='w-5 h-auto' /> :
                  <MdOutlineKeyboardArrowDown className='w-5 h-auto' />
              }
            </NavLink>
            {/* <!-- Dropdown Menu Start --> */}
            <div
              className={`translate transform overflow-hidden ${!open && 'hidden'
                }`}>
              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                {
                  routes.map((route: any, index: number) => {
                    return (
                      <LinkLists
                        key={index}
                        link={route.link}
                        name={route.name}
                      />
                    );
                  })
                }
              </ul>
            </div>
            {/* <!-- Dropdown Menu End --> */}
          </React.Fragment>
        );
      }}
    </SidebarLinkGroup>
  );
};

const LinkLists = ({ link, name }: { link: string, name: string }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
        (isActive && '!text-white')
      }>
      {name}
    </NavLink>
  );
}
