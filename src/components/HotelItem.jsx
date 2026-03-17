import React from 'react'
import { useNavigate } from 'react-router'

const HotelItem = ({hotel}) => {
    const navigate = useNavigate()

  return (
        <div onClick={() => navigate(`/hotel/${hotel.id}`)} 
         className="overflow-hidden h-[26vh] sm:h-[40vh] bg-white rounded-xl cursor-pointer group hover:shadow-lg duration-150 ease-in-out">
             {/* top */}
          <div className="overflow-hidden  h-30 sm:h-40 ">
             <img
              src={hotel.image} alt={hotel.titre}
              className='w-full h-full group-hover:scale-105 duration-150 ease-in-out' 
              />
          </div>
          {/* description */}
          <div className="flex flex-col gap-2 justify-center px-3 py-4 ">
             <p className='text-orange-400 text-[12px]'>{hotel.localisation}</p>
             <h3 className='text-md font-bold'>{hotel.titre} </h3>
             <p className='text-[12px] text-neutral-700 mt-1'>{hotel.prix} XOF par nuit</p>

          </div>
        </div>
  )
}

export default HotelItem
