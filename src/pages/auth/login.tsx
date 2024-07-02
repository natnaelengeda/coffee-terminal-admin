import { useState, useEffect } from 'react';

// Mantine
import {
  TextInput,
  PasswordInput,
} from '@mantine/core';

import { useForm } from '@mantine/form';

// JWT
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';

// Axios
import axios from '../../http/axios';

// Toast
import { Bounce, toast } from 'react-toastify';

// State 
import { useDispatch } from 'react-redux';
import { login } from '../../state/admin';

// Loading
import ReactLoading from 'react-loading';

export interface UserAccessToken {
  id: string;
  name: string;
  email: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 4 ? null : 'Password is too short'),
    },
  });

  const loginFunction = async (data: any) => {
    setLoading(true);
    await axios.post('/admin/login', data)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          const decoded = jwtDecode<UserAccessToken>(response.data.accessToken);
          dispatch(login(decoded));
          toast.success('Login Success', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          navigate('/');
        }
      })
      .catch((error) => {
        const status = error.response.status;
        setLoading(false);
        if (status == 400) {
          toast.error('Admin Not Found', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else if (status == 401) {
          toast.error('Invalid Credentials', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else if (status == 402) {
          toast.info('Please Fill In all Fields', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error('An Error Occured', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      });
  }

  return (
    <div className='w-full h-full min-h-screen bg-gray-900 flex flex-col py-20'>
      <div className="w-auto md:w-96 mx-auto h-full rounded-xl bg-gray-200 flex flex-col gap-5 items-center justify-start py-10 px-10 md:px-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-Poppints font-bold">Login</h1>
        </div>
        <form
          className='w-full flex flex-col gap-4 px-5'
          onSubmit={form.onSubmit((values) => loginFunction(values))}>
          <TextInput
            label="Email Adress"
            className='w-full'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            className='w-full'
            {...form.getInputProps('password')}
          />
          <button
            className={`w-full h-12 ${loading ? "bg-gray-400" : "bg-black"} text-white flex items-center justify-center gap-2 hover:opacity-9 rounded`}
            type='submit'>
            {
              loading ? (
                <>
                  <ReactLoading
                    type={"spokes"}
                    color={"#fff"}
                    height={20}
                    width={20} />
                  <p>Logging in...</p>
                </>
              ) : "Login"
            }
          </button>
        </form>

      </div>
    </div>
  )
}
