import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Root from './routes/Roots.tsx';
import Home from './pages/home/index.tsx';
import Login from './pages/auth/login.tsx';
import Signup from './pages/auth/signup.tsx';

// Styles 
import './index.css'
import './styles/tailwind.css'
import '@mantine/core/styles.css';
import "react-toastify/dist/ReactToastify.css";

// State
import { Provider } from 'react-redux';
import { persistor, store } from './store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </MantineProvider>
  );
}


root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
