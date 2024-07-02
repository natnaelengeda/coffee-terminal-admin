import { useEffect } from 'react'
import {
  Outlet,
  useNavigate,
} from 'react-router-dom';
import Header from '../layouts/Header';

// State 
import { useSelector } from 'react-redux';

export default function Root() {
  const admin = useSelector((state: any) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin.isLoggedIn == false) {
      navigate('/login');
    } else if (admin.isLoggedIn == true) {
      navigate('/');
    }
  }, []);

  return (
    <>
      {
        admin.isLoggedIn &&
        <Header />
      }
      <main className='w-full h-full min-h-screen bg-gray-100'>
        <Outlet />
      </main>
    </>
  )
}
