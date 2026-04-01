import React from 'react'
import { useNavigate } from 'react-router'

const HotelItem = ({hotel}) => {
    const navigate = useNavigate()

  

  return (
        <div onClick={() => navigate(`/hotel/${hotel.id}`)} 
         className="overflow-hidden h-[30vh] sm:h-[45vh] bg-white rounded-xl cursor-pointer group hover:shadow-lg duration-150 ease-in-out">
             {/* top */}
          <div className="overflow-hidden ">
             <img
              src={hotel.image_url} alt={hotel.titre}
              className='w-full  h-30 sm:h-40  group-hover:scale-105 duration-150 ease-in-out' 
              />
          </div>
          {/* description */}
          <div className="flex flex-col gap-1 sm:gap-2 justify-center px-3 py-4 ">
             <p className='text-orange-400 text-[12px]'>{hotel.adresse}</p>
             <h3 className='titre_hotel line-clamp-1 text-xs sm:text-md font-bold'>{hotel.nom} </h3>
             <p className='text-[10px] sm:text-[12px] text-neutral-700 mt-1'>{hotel.prix_par_nuit} XOF par nuit</p>

          </div>
        </div>
  )
}

export default HotelItem
