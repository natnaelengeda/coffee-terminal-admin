import { useEffect } from 'react';
import {
  TextInput,
  PasswordInput,
  Button
} from '@mantine/core';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import axios from '../../http/axios';
import { Bounce, toast } from 'react-toastify';

// State 
import { useDispatch } from 'react-redux';
import { login } from '../../state/admin';

export interface UserAccessToken {
  id: string;
  name: string;
  email: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Button
            type='submit'
            color='black'
            variant="filled">
            Login
          </Button>
        </form>

      </div>
    </div>
  )
}
