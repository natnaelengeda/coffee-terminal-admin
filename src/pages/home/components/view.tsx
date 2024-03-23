
export default function View() {
  const normData = [
    {
      id: 1,
      title: "Fast Food | ፈጣን ምግብ",
      foods: [
        { id: 1, name: "Pizza | ፒዛ", price: 100, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 2, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 3, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 4, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 5, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 6, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 7, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 8, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
      ]
    },
    {
      id: 2,
      title: "Hot Beverage | ትኩስ መጠጥ",
      foods: [
        { id: 1, name: "Pizza | ፒዛ", price: 100, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 2, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 3, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 4, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 5, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 6, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 7, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
        { id: 8, name: "Burger | በርግር", price: 50, image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg" },
      ]
    }
  ];
  return (
    <div className='w- mx-auto container h-full flex flex-col gap-5 md:px-3 py-5'>
      {
        normData.map((items) => (
          <div
            key={items.id}
            className='w-full h-full flex flex-col gap-2'>
            <div>
              <h1 className='text-xl font-semibold'>{items.title}</h1>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-10 py-2'>
              {
                items.foods.map((food) => (
                  <div
                    key={food.id}
                    className='w-full h-24 border border-gray-300 rounded flex flex-row shadow-sm'>
                    {/* Name & Price */}
                    <div className='w-full flex flex-col px-4 py-2'>
                      <h1 className='text-lg font-semibold'>{food.name}</h1>
                      <p className='text-sm'>{food.price} Birr</p>
                    </div>

                    {/* Image */}
                    <div className='w-full flex items-center justify-end p-2 overflow-hidden'>
                      <img
                        className='w-24 h-full object-cover rounded'
                        src={food.image}
                        alt={`${food.name} Image`} />
                    </div>
                  </div>
                ))
              }

            </div>

          </div>
        ))
      }
    </div>
  )
}
