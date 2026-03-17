import React, { useState } from 'react'
import HotelItem from '../../components/HotelItem';
import AjouterHotel from '../../components/AjouterHotel';
import { hotels } from '../../hook/bd';


const Hotels = () => {
   const [ShowAddHotel ,setShowAddHotel] = useState(false)


  
  
    
  return (
    <div className='relative '>
         {/* top */}
       <div className="flex items-center justify-between bg-neutral-50 px-5 py-3">
          <div className="flex items-center gap-2">
              <p className='text-md text-neutral-800'>Hotels <span>8</span></p>
          </div>
          <button 
          onClick={() => setShowAddHotel(true)}
          className='px-5 py-1 text-sm border border-neutral-300 hover:bg-yellow-500 hover:text-white duration-300 ease-linear rounded-md'>+ Creer un nouveau hotel</button>
       </div>
       {/* galeri hotel */}

        <div className="p-5 overflow-y-scroll  h-[86vh]  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-10">
            {
               hotels.map((hotel) => (
                   <HotelItem hotel={hotel} key={hotel.id} />
               ))
            }
        </div>

        {/* formulaire ajouter hotel */}
        {
          ShowAddHotel && (<AjouterHotel setShowAddHotel={setShowAddHotel} />
          )
        }
    </div>
  )
}

export default Hotels
