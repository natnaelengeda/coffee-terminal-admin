import { useState, useEffect } from 'react';

// Components
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'

// axios
import axios from "@/http/axios";

export default function ViewAdmin() {
  const [admins, setAdmins] = useState<any>([]);

  const fetchAdmins = () => {
    axios.get("/admin/getAll")
      .then((response) => {
        setAdmins(response.data);
      }).catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Admins" />

      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Admins
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-bold">Full Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-bold">Email</p>
          </div>
        </div>

        {
          admins &&
          admins.map((admin: any, index: number) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={index}
            >
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm text-black dark:text-white">
                    {admin.name}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {admin.email}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
