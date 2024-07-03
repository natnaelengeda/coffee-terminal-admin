import { NavLink } from 'react-router-dom'

interface ISingleButton {
  icon: any;
  name: string;
  link: string;
  pathname: string;
}
export default function SingleButton({ icon, name, link, pathname }: ISingleButton) {
  return (
    <li>
      <NavLink
        to={link}
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') &&
          'bg-graydark dark:bg-meta-4'
          }`}>
        {icon}
        {name}
      </NavLink>
    </li>
  )
}
