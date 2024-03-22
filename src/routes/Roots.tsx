import React from 'react'
import {
  Outlet,
  useNavigate,
} from 'react-router-dom';

export default function Root() {
  return (
    <main className=''>
      <Outlet />
    </main>
  )
}
