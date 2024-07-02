import { useState } from 'react';

// Mantine
import { useDisclosure } from '@mantine/hooks';
import { Modal, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

// Axios
import axios from "@/http/axios";
import axiosFile from "@/http/axiosFile";

// React Loading
import ReactLoading from 'react-loading';

// Toast
import { toast } from 'react-toastify';

export default function BranchCard({ branch, fetchBranches }: { branch: any, fetchBranches: () => void }) {
  const env = import.meta.env;
  const [opened, { open, close }] = useDisclosure(false);
  const { name, gate, description, location, locationOnMap, image } = branch;

  // Loading
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateImageLoading, setUpdateImageLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: name,
      gate: gate,
      description: description,
      location: location,
      locationOnMap: locationOnMap
    },
  });

  const updateBranch = (data: any) => {
    setUpdateLoading(true);
    axios.put("branches", { ...data, id: branch._id })
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          fetchBranches();
          setUpdateLoading(false);
          toast.success('Branch Updated', {
            position: "top-right",
            autoClose: 2000,
          });
          close();
        }
      }).catch((error) => {
        console.error(error);
        setUpdateLoading(false);
      })
  }

  const updateImage = (event: any) => {
    setUpdateImageLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("id", branch._id);
    axiosFile.post("/branches/image", formData)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          fetchBranches();
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
    axios.delete(`/branches/${branch._id}`)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          setDeleteLoading(false);
          fetchBranches();
          toast.success('Branch Deleted', {
            position: "top-right",
            autoClose: 2000,
          });
          close();
        }
      }).catch((error) => {
        console.error(error);
        setDeleteLoading(false);
        toast.error("Error Deleting Branch");
      })
  }

  return (
    <>
      <div
        // onClick={open}
        className='w-full h-full min-h-24 border border-gray-300 rounded flex flex-row shadow-sm'>
        {/* Name & Price */}
        <div className='w-full flex flex-col items-start justify-start px-4 py-2'>
          <h1 className='text-lg font-bold'>{name}</h1>
          <h1 className='text-lg font-light'>{gate}</h1>
          <h1 className='text-lg font-semibold'>{description}</h1>
          <h1 className='text-lg font-semibold'>{location}</h1>
          <div className='py-3'>
            <a
              target="_blank"
              href={locationOnMap != "" ? locationOnMap : ""}
              className='px-5 py-2 bg-black text-white hover:opacity-90 rounded'>
              Map
            </a>
          </div>
        </div>

        {/* Image */}
        <div className='w-full flex items-center justify-end p-2 overflow-hidden boo'>
          <img
            onClick={open}
            className="w-32 h-full object-cover rounded border border-gray-200 cursor-pointer"
            src={`${env.VITE_SERVER_URL}/branches/getImage/${image}`}
            alt={`${name} Image`}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = "https://www.coffeeterminalet.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo%2Btext.fa3e6227.png&w=640&q=75"
            }}
          />
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Update">
        <div className='w-full h-full flex flex-col gap-5'>
          <form
            onSubmit={form.onSubmit((values) => updateBranch(values))}
            className='w-full h-full flex flex-col gap-3'>

            <TextInput
              // defaultValue={name}
              label="Name"
              className='w-full'
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Gate"
              className='w-full'
              {...form.getInputProps('gate')}
            />
            <Textarea
              label="Description"
              rows={5}
              className='w-full'
              {...form.getInputProps('description')}
            />
            <TextInput
              label="Location"
              className='w-full'
              {...form.getInputProps('location')}
            />
            <TextInput
              label="Location On Map"
              className='w-full'
              {...form.getInputProps('locationOnMap')}
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
          <div className='w-full h-full flex flex-row items-center gap-5'>
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
