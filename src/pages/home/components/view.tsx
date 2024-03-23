import { useState, useEffect } from 'react';
import axios from '../../../http/axios';

// Image
import logo from '../../../assets/images/logo.png';
import ItemsCard from '../widgets/ItemsCard';

export default function View() {
  const [data, setData] = useState([]);

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
    <div className='w- mx-auto container h-full flex flex-col gap-5 md:px-3 py-5 px-5'>
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
                  <ItemsCard
                    key={food[0]._id}
                    _id={food[0]._id}
                    name={food[0].name}
                    price={food[0].price}
                    image={food[0].image}
                    fetchItems={fetchItems}
                  />
                ))
              }
            </div>
          </div>
        ))
      }
      {
        data && data.length == 0 && (
          <div className='w-full h-full flex flex-col items-start justify-start py-20'>
            <div className='w-full h-full flex flex-col gap-10 items-center'>
              <img
                className='w-28 md:w-40 h-auto '
                src={logo}
                alt="Coffee Terminal Image" />
              <div>
                <h1 className='text-lg md:text-3xl font-bold'>We God No Items for the Moment</h1>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
