import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

// State 
import { useSelector } from 'react-redux';
import View from "./components/view";
import Add from "./components/add";

export default function Home() {
  const admin = useSelector((state: any) => state.admin);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (admin.isLoggedIn == false) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="w-full">
      <Tabs
        defaultValue="view"
        orientation={isSmallScreen ? 'horizontal' : 'vertical'}
        variant={isSmallScreen ? 'pills' : 'default'}
      >
        <Tabs.List className="md:w-40"
        // style={{
        //   width: 200,
        // }}
        >
          <Tabs.Tab
            style={{
              height: 50
            }}
            value="view">
            View</Tabs.Tab>
          <Tabs.Tab
            style={{
              height: 50
            }}
            value="add">
            Add </Tabs.Tab>
          {/* <Tabs.Tab
            style={{
              height: 50
            }}
            value="settings">
            Settings</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="view">
          <View />
        </Tabs.Panel>
        <Tabs.Panel value="add">
          <Add />
        </Tabs.Panel>
        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </Tabs>
    </div>
  )
}
