import { useState } from 'react';

// Mantine
import { useDisclosure } from '@mantine/hooks';
import { Modal, TextInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';

// Axios
import axios from '@/http/axios';
import axiosFile from '@/http/axiosFile';

// Toast
import { Bounce, toast } from 'react-toastify';
import ReactLoading from 'react-loading';

export default function ItemsCard(
  {
    _id,
    name,
    price,
    image,
    branches,
    mainBranches,
    fetchItems,
  }: {
    _id: string,
    name: string,
    price: number,
    image: string,
    branches: any,
    mainBranches: any,
    fetchItems: any
  }) {
  const [opened, { open, close }] = useDisclosure(false);
  const env = import.meta.env;
  const id = _id;

  // Loading
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateImageLoading, setUpdateImageLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [branchesLoading, setBranchesLoading] = useState(false);

  // Branches
  const [selectedBranches, setSelectedBranches] = useState([]);

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
    setUpdateLoading(true);

    await axios.put('/food', { ...values, id })
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          setUpdateLoading(false);
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
        setUpdateLoading(false);
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

  const updateImage = (event: any) => {
    setUpdateImageLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("id", id);
    axiosFile.post("/food/image", formData)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          fetchItems();
          setUpdateImageLoading(false);
          toast.success('Branch Image Updated', {
            position: "top-right",
            autoClose: 2000,
          });
          close();
        }
      }).catch((error) => {
        console.error(error);
        setUpdateImageLoading(false);
      })
  };

  const triggerFileInputClick = () => {
    document.getElementById('hiddenFileInput')!.click();
  };

  const deleteBranch = () => {
    setDeleteLoading(true);
    axios.delete(`/food/${id}`)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          setDeleteLoading(false);
          fetchItems();
          toast.success('Item Deleted', {
            position: "top-right",
            autoClose: 2000,
          });
          close();
        }
      }).catch((error) => {
        console.error(error);
        setDeleteLoading(false);
        toast.error("Error Deleting Item");
      })
  }

  // Step 3: Implement the onChange handler
  const handleCheckboxChange = (branchName: any) => {
    setSelectedBranches((prevSelectedBranches: any) => {
      if (prevSelectedBranches.includes(branchName)) {
        // If the branch is already selected, remove it from the array
        return prevSelectedBranches.filter((name: any) => name !== branchName);
      } else {
        // If the branch is not selected, add it to the array
        return [...prevSelectedBranches, branchName];
      }
    });
  };

  const updateBranch = () => {
    setBranchesLoading(true);
    axios.put('/food/branches', { id, branches: selectedBranches })
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          setBranchesLoading(false);
          fetchItems();
          toast.success('Branches Updated', {
            position: "top-right",
            autoClose: 2000,
          });
          close();
        }
      }).catch((error) => {
        console.error(error);
        setBranchesLoading(false);
      })
  }

  return (
    <>
      <div
        key={_id}
        className='w-full h-24 border border-gray rounded flex flex-row shadow-xl'>
        {/* Name & Price */}
        <div className='w-full flex flex-col px-4 py-2'>
          <h1 className='text-lg font-semibold'>{name}</h1>
          <p className='text-sm'>{price} Birr</p>
        </div>

        {/* Image */}
        <div className='w-full flex items-center justify-end p-2 overflow-hidden'>
          <img
            onClick={open}
            className="w-24 h-full object-cover rounded border border-gray-200 cursor-pointer"
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
        <div className='w-full h-full flex flex-col gap-3'>
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
              disabled={updateLoading}
              type='submit'
              className={`w-full px-6 py-2 ${updateLoading ? "bg-gray-400" : "bg-orange-500"} text-white rounded flex flex-row items-center justify-center gap-2 hover:opacity-90`}>
              {
                updateLoading ? (
                  <>
                    <ReactLoading
                      type='spin'
                      color='white'
                      height={20}
                      width={20} />
                    <p>Updating...</p>
                  </>
                ) : "Update"
              }
            </button>
          </form>
          <div className='w-full h-full flex flex-row items-center gap-3'>

            {/* Update Image */}
            <div className='w-full h-full'>
              <input
                type="file"
                id="hiddenFileInput"
                onChange={updateImage}
                style={{ display: 'none' }} // Hide the file input
              />
              <button
                onClick={triggerFileInputClick}
                disabled={updateImageLoading}
                type='submit'
                className={`w-full px-6 py-2 ${updateImageLoading ? "bg-gray-400" : "bg-orange-800"} text-white rounded flex flex-row items-center justify-center gap-2 hover:opacity-90`}>
                {
                  updateImageLoading ? (
                    <>
                      <ReactLoading
                        type='spin'
                        color='white'
                        height={20}
                        width={20} />
                      <p>Updating...</p>
                    </>
                  ) : "Update Image"
                }
              </button>
            </div>
            {/* Delete Button */}
            <button
              onClick={deleteBranch}
              disabled={deleteLoading}
              className={`w-full px-6 py-2 ${deleteLoading ? "bg-gray-400" : "bg-red-500"} text-white rounded flex flex-row items-center justify-center gap-2 hover:opacity-90`}>
              {
                deleteLoading ? (
                  <>
                    <ReactLoading
                      type='spin'
                      color='white'
                      height={20}
                      width={20} />
                    <p>Deleting...</p>
                  </>
                ) : "Delete"
              }
            </button>
          </div>

          <div className='w-full h-auto boor rounded flex flex-col items-start justify-start gap-4 py-2 px-4'>
            <div className='text-sm flex flex-col items-start justify-around gap-1'>
              <h1 className='text-lg font-bold pb-2'>Branch:</h1>
              {
                mainBranches.map((branch: any, index: number) => {
                  return (
                    <Checkbox
                      color="red"
                      size="xs"
                      key={index}
                      defaultChecked={branches.includes(branch.name)}
                      onChange={() => handleCheckboxChange(branch.name)} // Step 2: Update Checkbox to accept onChange
                      label={branch.name}
                    />
                  );
                })
              }
            </div>

            <button
              disabled={branchesLoading}
              onClick={updateBranch}
              className={`px-4 py-1 ${branchesLoading ? "bg-gray-300" : "bg-slate-600"}  text-white rounded flex flex-row items-center justify-center gap-2`}>
              {
                branchesLoading ? (
                  <>
                    <ReactLoading
                      type='spin'
                      color='white'
                      height={20}
                      width={20} />
                    <p>Updating...</p>
                  </>
                ) : "Update"
              }
            </button>
          </div>

          {/* Cancel Button */}
          <div className='w-full h-full flex flex-row items-center'>
            <button
              onClick={close}
              className='w-full px-4 py-2 bg-gray-500 text-white rounded hover:opacity-90'>
              Cancel
            </button>
          </div>
        </div>

      </Modal>
    </>
  )
}
