import React, { useState } from 'react'
import HotelItem from '../../components/HotelItem';
import AjouterHotel from '../../components/AjouterHotel';
import { hotels } from '../../hook/bd';
import { CiSearch } from "react-icons/ci";
import Recherche from './Recherche';


const Hotels = () => {
   const [ShowAddHotel ,setShowAddHotel] = useState(false)
   const [showRecherche ,setShowRecherche] = useState(false)


  
  
    
  return (
    <div className='relative overflow-hidden'>
         {/* top */}
       <div className="flex items-center justify-between bg-neutral-50 px-5 py-5 sm:py-3">
          <div className="flex items-center gap-2">
              <p className='text-md text-neutral-800'>Hotels <span>8</span></p>
          </div>
          <button 
          onClick={() => setShowAddHotel(true)}
          className='px-5 py-1 text-sm border border-neutral-300 hover:bg-yellow-500 hover:text-white duration-300 ease-linear rounded-md'>+ Creer un nouveau hotel</button>
       </div>
       {/* galeri hotel */}

        <div className="px-5 pt-5  pb-[100px] overflow-y-scroll h-[86vh] sm:h-[84vh]  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-10">
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

        {/* bouton recherche  */}
       <div className="absolute bottom-20 right-5 w-[60px] h-[60px] rounded-full shadow-lg shadow-neutral-400 bg-orange-400 focus-within:bg-orange-600 focus-within:ring-2 focus-within:ring-yellow-500 flex items-center justify-center transition-all duration-300">
        <button>
          <CiSearch className="w-10 text-xl text-white" />
        </button>
       </div>
    
       
       {/* zone de recherche */}

         <Recherche setShowRecherche={setShowAddHotel} showRecherche={showRecherche}></Recherche>
      

         </div>
       
  )
}

export default Hotels
