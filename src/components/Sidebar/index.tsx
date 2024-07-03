import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Logo
import Logo from '@/assets/images/logo.png';

// Icons
import { LuLayoutDashboard } from "react-icons/lu";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

// Component
import DropdownButton from './components/DropdownButton';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink
          className={"w-full h-full flex flex-row items-center justify-start gap-3"}
          to="/">
          <img src={Logo} alt="Logo" />
          <p
            className='text-lg md:text-2xl font-bold text-white'>
            Admin
          </p>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden">
          <MdKeyboardBackspace className='w-6 h-auto' />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">

              {/* Dashboard */}
              <DropdownButton
                icon={<LuLayoutDashboard className='w-5 h-auto' />}
                name="Dashboard"
                link="/"
                linkName="dashboard"
                pathname={pathname}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
                routes={[
                  { name: "View Foods", link: '/' },
                  { name: "Add Items", link: '/dashboard/add' },
                  { name: "Branches", link: '/dashboard/branches' },
                ]} />

              {/* Admins */}
              <DropdownButton
                icon={<RiAdminFill className='w-5 h-auto' />}
                name="Admins"
                link="/auth"
                linkName="auth"
                pathname={pathname}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
                routes={[
                  { name: "View Admins", link: '/auth/admins' },
                  { name: "Add Admin", link: '/auth/signup' },
                ]} />
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
