import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// State 
import { useSelector } from 'react-redux';

// Axios
import axios from "@/http/axios";

// Components
import View from "./components/View";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const admin = useSelector((state: any) => state.admin);

  const fetchItems = async () => {
    await axios.get('/food')
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          setLoading(false);
          setData(response.data);
        }
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
    <div className="w-full h-full">
      <View
        data={data}
        loading={loading}
        fetchItems={fetchItems} />
    </div>
  )
}
