import { useState, useEffect } from 'react';
import axios from '../../../http/axios';

// Image
import logo 
export default function View() {
  const [data, setData] = useState([]);
  const env = import.meta.env;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    await axios.get('/food/getAll')
      .then((response) => {
        setData(response.data);
      })
  }

  return (
    <div className='w- mx-auto container h-full flex flex-col gap-5 md:px-3 py-5'>
      {
        data && data.map((items: any) => (
          <div
            key={items._id}
            className='w-full h-full flex flex-col gap-2'>
            <div>
              <h1 className='text-xl font-semibold'>{items.title}</h1>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-10 py-2'>
              {
                items.foodList.map((food: any) => (
                  <div
                    key={food._id}
                    className='w-full h-24 border border-gray-300 rounded flex flex-row shadow-sm'>
                    {/* Name & Price */}
                    <div className='w-full flex flex-col px-4 py-2'>
                      <h1 className='text-lg font-semibold'>{food[0].name}</h1>
                      <p className='text-sm'>{food[0].price} Birr</p>
                    </div>

                    {/* Image */}
                    <div className='w-full flex items-center justify-end p-2 overflow-hidden'>
                      <img
                        className="w-24 h-full object-cover rounded border border-gray-200"
                        src={`${env.VITE_SERVER_URL}/food//getImage/${food[0].image}`}
                        alt={`${food[0].name} Image`}
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = "https://i.ibb.co/grVfW88/logo.png"
                        }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }

      {
        data && data.length == 0 && (
          <div className='w-full h-full flex flex-col items-start justify-start'>
            <div className='w-full h-full flex flex-col gap-10'>
              <img src={logo} alt="" />
            </div>
          </div>
        )
      }
    </div>
  )
}
