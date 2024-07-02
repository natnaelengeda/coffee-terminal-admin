import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mantine
import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

// State 
import { useSelector } from 'react-redux';

// Axios
import axios from "@/http/axios";

// Components
import Add from "./components/Add";
import View from "./components/View";
import Branches from "./components/Branches";

export default function Home() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const admin = useSelector((state: any) => state.admin);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');



  const fetchItems = async () => {
    await axios.get('/food')
      .then((response) => {
        setData(response.data);
      })
  }

  useEffect(() => {
    if (admin.isLoggedIn == false) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <div className="w-full pt-20">
      <Tabs
        defaultValue="view"
        orientation={isSmallScreen ? 'horizontal' : 'vertical'}
        variant={isSmallScreen ? 'pills' : 'default'}>
        <Tabs.List className="md:w-40 bg-white">
          <Tabs.Tab
            style={{
              height: 50,
              '&:hover': {
                backgroundColor: 'red'
              }
            }}
            value="view">
            View
          </Tabs.Tab>
          <Tabs.Tab
            style={{
              height: 50
            }}
            value="add">
            Add
          </Tabs.Tab>
          <Tabs.Tab
            style={{
              height: 50
            }}
            value="branches">
            Branches
          </Tabs.Tab>
        </Tabs.List>

        {/* Panels */}
        <Tabs.Panel value="view">
          <View
            data={data}
            fetchItems={fetchItems} />
        </Tabs.Panel>
        <Tabs.Panel value="add">
          <Add />
        </Tabs.Panel>
        <Tabs.Panel value="branches">
          <Branches />
        </Tabs.Panel>

      </Tabs>
    </div>
  )
}
