import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// State 
import { useSelector } from 'react-redux';

// Axios
import axios from "@/http/axios";

// Components
import View from "./components/View";

// Mantine
import {
  Menu,
} from '@mantine/core';

// Icons
import { CiSettings } from "react-icons/ci";

export default function Home() {
  const [data, setData] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const admin = useSelector((state: any) => state.admin);

  const fetchItems = () => {
    axios.get('/food')
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          setLoading(false);
          setData(response.data);
        }
      }).catch((error) => {
        console.error(error);
      })
  }

  const fetchBranches = () => {
    axios.get('/branches')
      .then((response) => {
        setBranches(response.data);
      }).catch((error) => {
        console.error(error);
      });
  };

  const fetchItemsBranch = (selected: string) => {
    axios.get(`/food?branch=${selected}`)
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          setLoading(false);
          setData(response.data);
        }
      }).catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    if (admin.isLoggedIn == false) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    fetchItems();
    fetchBranches();
  }, []);


  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4">

      <div className="w-full h-full flex items-center justify-between">

        {/* Branch */}
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold">Branch</h1>
            <Menu
              position="right-start"
              shadow="md"
              width={200}>
              <Menu.Target>
                <button>
                  <CiSettings className="text-2xl" />
                </button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Branches</Menu.Label>
                <Menu.Item
                  onClick={fetchItems}>
                  All
                </Menu.Item>
                {
                  branches.map((branch: any, index: number) => (
                    <Menu.Item
                      key={index}
                      onClick={() => fetchItemsBranch(branch.name)}>
                      {branch.name}
                    </Menu.Item>
                  ))
                }
              </Menu.Dropdown>
            </Menu>
          </div>
          <hr className="w-40 border" />
        </div>

      </div>

      <View
        data={data}
        branches={branches}
        loading={loading}
        fetchItems={fetchItems} />
    </div>
  )
}
