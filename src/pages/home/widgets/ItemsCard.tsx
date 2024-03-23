import { useDisclosure } from '@mantine/hooks';
import { Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from '../../../http/axios';
import { Bounce, toast } from 'react-toastify';

export default function ItemsCard(
  {
    _id,
    name,
    price,
    image,
    fetchItems,
  }: {
    _id: string,
    name: string,
    price: number,
    image: string,
    fetchItems: any
  }) {
  const [opened, { open, close }] = useDisclosure(false);
  const env = import.meta.env;
  const id = _id;

  const form = useForm({
    initialValues: {
      name: name,
      price: price,
    },

    validate: {

      name: (value) => {
        if (value.length < 3) {
          return 'Name is too short';
        }
        return null;
      },
      price: (value) => {
        if (!value) {
          return 'Price is required';
        }
        return null;
      }
    }
  });

  const updateItem = async (values: any) => {
    await axios.post('/food/updateFood', { ...values, id })
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          toast.success('Item Updated', {
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
          close();
          fetchItems();
        }
      })
      .catch((error) => {
        const status = error.response.status;

        if (status == 404) {
          toast.error('Item Not Found', {
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
          toast.error('Error Updating Item', {
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

  return (
    <>
      <div
        onClick={open}
        key={_id}
        className='w-full h-24 border border-gray-300 rounded flex flex-row shadow-sm'>
        {/* Name & Price */}
        <div className='w-full flex flex-col px-4 py-2'>
          <h1 className='text-lg font-semibold'>{name}</h1>
          <p className='text-sm'>{price} Birr</p>
        </div>

        {/* Image */}
        <div className='w-full flex items-center justify-end p-2 overflow-hidden'>
          <img
            className="w-24 h-full object-cover rounded border border-gray-200"
            src={`${env.VITE_SERVER_URL}/food//getImage/${image}`}
            alt={`${name} Image`}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = "https://i.ibb.co/grVfW88/logo.png"
            }}
          />
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Edit">
        <div className='w-full h-full flex flex-col gap-5'>
          <form
            onSubmit={form.onSubmit((values) => updateItem(values))}
            className='w-full h-full flex flex-col gap-3'>

            <TextInput
              // defaultValue={name}
              label="Name"
              className='w-full'
              {...form.getInputProps('name')}
            />
            <TextInput
              type='number'
              label="Price"
              className='w-full'
              {...form.getInputProps('price')}
            />
            {/* Update Button */}
            <button
              type='submit'
              className='w-full px-6 py-2 bg-orange-500 text-white rounded'>
              Update
            </button>
          </form>
          <div className='w-full h-full flex flex-row items-center gap-10'>

            {/* Delete Button */}
            <button className='w-full px-4 py-2 bg-red-600 text-white rounded'>
              Delete
            </button>
          </div>
          {/* Cancel Button */}
          <div className='w-full h-full flex flex-row items-center'>
            <button
              onClick={close}
              className='w-full px-4 py-2 bg-gray-500 text-white rounded'>
              Cancel
            </button>
          </div>
        </div>

      </Modal>
    </>
  )
}
