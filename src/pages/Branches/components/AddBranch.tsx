import { useState } from "react";

// Mantine
import {
  Modal,
  TextInput,
  Textarea,
  FileInput
} from "@mantine/core";
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";

// Axios
import axios from "@/http/axiosFile";

// Icons
import { FaPlus } from "react-icons/fa6";

// React Loading
import ReactLoading from 'react-loading';

// Toast
import { Bounce, toast } from 'react-toastify';

export default function AddBranch() {
  const [opened, { open, close }] = useDisclosure();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      gate: "",
      description: "",
      location: "",
      locationOnMap: "",
      image: [],
      additional: "",
    },

    validate: {
      name: (value) => value.length < 2 ? 'Name is too short' : null,
      gate: (value) => value.length < 2 ? 'Gate is too short' : null,
      description: (value) => value.length < 2 ? 'Description is too short' : null,
      location: (value) => value.length < 2 ? 'Location is too short' : null,
      locationOnMap: (value) => value.length < 2 ? 'Location on map is too short' : null,
      image: (value) => value.length == 0 ? 'Image is Required' : null,
    }
  });


  const AddBranch = (data: any) => {
    setLoading(true);

    axios.post("/branches", data)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          toast.success('Branch Added', {
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
          setLoading(false);
          close();
        }
      }).catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Failed to add Branch");
      })
  }

  return (
    <div className='w-full h-full flex flex-col items-start justify-start py-4'>
      <button
        onClick={open}
        className="w-36 py-3 bg-red-800 text-white flex flex-row items-center justify-center gap-2 hover:opacity-80">
        <FaPlus className='text-2xl' />
        Add Branch
      </button>

      <Modal
        opened={opened}
        onClose={close}
        title="Add Branch"
        size={"lg"}
        centered>
        <div className="w-full h-full flex flex-col gap-3 items-start justify-start">
          <hr className="w-80 border border-black" />

          <form
            className="w-full h-full flex flex-col gap-5 pr-5"
            onSubmit={form.onSubmit((values) => AddBranch(values))}>
            <TextInput
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
              label="Location on Map"
              className='w-full'
              {...form.getInputProps('locationOnMap')}
            />
            <FileInput
              label="Image"
              placeholder="Upload Image"
              className='w-full'
              {...form.getInputProps('image')}
            />
            <button
              disabled={loading}
              type="submit"
              className={`w-full h-12 text-white ${loading ? "bg-gray-400" : "bg-red-800"} flex items-center justify-center gap-2`}>
              {
                loading ? (
                  <>
                    <ReactLoading type='spin' color='white' height={20} width={20} />
                    <p>Adding...</p>
                  </>
                ) : "Add Branch"
              }
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
