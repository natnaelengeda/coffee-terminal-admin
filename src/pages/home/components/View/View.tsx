
// Image
import logo from '@/assets/images/logo.png';
import ItemsCard from './components/ItemsCard';

// React Loading
import ReactLoading from 'react-loading';

export default function View({ data, loading, fetchItems }: { data: any, loading: boolean, fetchItems: any }) {


  return (
    <div className='mx-auto container h-full flex flex-col gap-5 md:px-3 py-5 px-5'>
      {
        !loading &&
        data &&
        data.map((items: any) => (
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
      {
        !loading &&
        data &&
        data.length == 0 && (
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
