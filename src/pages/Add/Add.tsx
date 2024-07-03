import { useState, useEffect } from 'react';

// Mantine
import {
  TextInput,
  Button,
  FileInput,
  NativeSelect,
} from '@mantine/core';
import { useForm } from '@mantine/form';

// Axios
import axios from '@/http/axios';
import axiosFile from '@/http/axiosFile';

// Toast
import { Bounce, toast } from 'react-toastify';

export default function Add() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  function transformData(data: any) {
    const transformedData = data.map((item: any) => ({
      label: item.title,
      value: item._id,
    }));

    // Add an empty label and value at the start
    transformedData.unshift({ label: '', value: '' });

    return transformedData;
  }

  const fetchCategory = async () => {
    await axios.get('/food')
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          const transformedData = transformData(response.data);
          setCategory(transformedData);
        }
      }).catch((error) => {
        const status = error.response.status;
        if (status == 400) {
          toast.error('Category Already Exists', {
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
        else {
          toast.error('Something went wrong', {
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
      })
  }

  const form = useForm({
    initialValues: {
      category: ''
    },
    validate: {
      category: (value) => {
        if (value.length < 3) {
          return 'Category name is too short';
        }
        return null;
      }
    }
  });

  const addCategoryForm = useForm({
    initialValues: {
      category: '',
      image: '',
      name: '',
      price: '',
    },

    validate: {
      category: (value) => {
        if (!value) {
          return 'Category is required';
        }
        return null;
      },
      image: (value) => {
        if (value.length < 3) {
          return 'Image is required';
        }
        return null;
      },
      name: (value) => {
        if (value.length < 3) {
          return 'Name is too short';
        }
        return null;
      },
      price: (value) => {
        if (value.length < 1) {
          return 'Price is required';
        }
        return null;
      }
    }

  })

  const addCategory = async (values: any) => {
    await axios.post('/food/createCatagory', values)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          toast.success('Category Added', {
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
          form.reset();
        }
      }).catch((error) => {
        const status = error.response.status;
        if (status == 400) {
          toast.error('Category Already Exists', {
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
        else {
          toast.error('Something went wrong', {
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
      })
  }

  const addItem = async (values: any) => {
    await axiosFile.post('/food', values)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          toast.success('Item Added', {
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
          addCategoryForm.reset();
        }
      })
      .catch((error) => {
        const status = error.response.status;
        if (status == 404) {
          toast.error('Category Not Found', {
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
          toast.error('Something went wrong', {
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
    <div className='w-full h-full min-h-[90vh] grid grid-cols-1 md:grid-cols-2 p-5 gap-1 md:gap-10 border'>

      {/* Add Category */}
      <div className='w-full h-60 xl:px-20'>
        <div className='w-full h-full rounded-xl bg-white border  border-gray-300 shadow-sm flex flex-col items-start justify-start py-5 boor'>

          {/* Title */}
          <div className='w-full h-auto py-2'>
            <h1 className='text-center text-xl font-bold'>Add Category</h1>
          </div>

          {/* Form */}
          <form
            onSubmit={form.onSubmit((values) => addCategory(values))}
            className='w-full h-full flex flex-col gap-5 px-5 '>
            <TextInput
              label="Category Name"
              className='w-full'
              {...form.getInputProps('category')}
            />
            <Button
              type='submit'
              style={{
                width: '100%'
              }}>Add Category</Button>
          </form>

        </div>
      </div>

      {/* Add Item */}
      <div className='w-full h-[28rem] xl:px-20'>
        <div className='w-full h-full flex flex-col rounded-xl py-5 bg-white  border border-gray-300 shadow-sm '>

          {/* Title */}
          <div className='w-full h-full py-2'>
            <h1 className='text-center text-xl font-bold'>Add Item</h1>
          </div>

          <form
            onSubmit={addCategoryForm.onSubmit((values) => addItem(values))}
            className='w-full h-full flex flex-col gap-5 px-5'>
            <NativeSelect
              defaultValue={category && category[0]}
              label="Category"
              data={category && category}
              {...addCategoryForm.getInputProps('category')}
            />
            <FileInput
              label="Upload Image"
              className='w-full'
              {...addCategoryForm.getInputProps('image')}
            />
            <TextInput
              label="Name"
              className='w-full'
              {...addCategoryForm.getInputProps('name')}
            />
            <TextInput
              type='number'
              label="Price"
              className='w-full'
              {...addCategoryForm.getInputProps('price')}
            />

            <Button
              type='submit'
              style={{
                width: '100%'
              }}>Add Category</Button>
          </form>

        </div>
      </div>

    </div >
  )
}
