import { useEffect } from 'react'
import {
  Outlet,
  useNavigate,
} from 'react-router-dom';

// State 
import { useSelector } from 'react-redux';
import DefaultLayout from '@/layouts/DefaultLayout';

export default function Root() {
  const admin = useSelector((state: any) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin.isLoggedIn == false) {
      navigate('/auth/login');
    } else if (admin.isLoggedIn == true) {
      navigate('/');
    }
  }, []);


  if (admin.isLoggedIn == false) {
    return (
      <>
        <Outlet />
      </>
    )
  } else {
    return (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    )
  }

}
