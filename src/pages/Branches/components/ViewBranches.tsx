import { useState, useEffect } from "react";

// Axios
import axios from "@/http/axios";

// React Loading
import ReactLoading from 'react-loading';

// Components
import BranchCard from "./BranchCard";

export default function ViewBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBranches = () => {
    axios.get("/branches")
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          setBranches(response.data);
          setLoading(false);
        }
      })
  }

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className='mx-auto container h-full flex flex-col gap-5 md:px-3 py-5 px-5'>

      <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-10 py-2'>
        {
          !loading &&
          branches &&
          branches.map((branch: any, index: number) => {
            return (
              <BranchCard
                key={index}
                branch={branch}
                fetchBranches={fetchBranches}
              />
            )
          })
        }
      </div>

      {
        loading &&
        <div className="w-full h-full flex items-center justify-center py-20">
          <ReactLoading
            type='spokes'
            color='black'
            height={100}
            width={100}
          />
        </div>
      }

    </div>
  )
}
