import { Menu, Button, Avatar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
// Images
import logo from '../assets/images/logo.png';

// State
import { useDispatch } from 'react-redux';
import { logout } from '../state/admin';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <header className='w-full h-20 border border-gray shadow-sm flex flex-row items-center justify-between px-10'>
      <div className='w-full h-auto'>
        <img
          className='w-14 h-auto object-contain'
          src={logo}
          alt="Coffe Terminal" />
      </div>
      <div className=''>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar className='cursor-pointer' radius="xl" />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item >
              <Button
                onClick={logoutFunction}
                style={{
                  width: '100%'
                }}>Logout</Button>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header >
  )
}
