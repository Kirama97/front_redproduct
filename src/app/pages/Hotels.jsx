import React, { useState } from 'react'
import HotelItem from '../../components/HotelItem';
import AjouterHotel from '../../components/AjouterHotel';
import { hotels } from '../../hook/bd';
import { CiSearch } from "react-icons/ci";
import Recherche from './Recherche';
import { useHotels } from '../../context/HotelContext';


const Hotels = () => {
  const { hotels , loading } = useHotels()
   const [ShowAddHotel ,setShowAddHotel] = useState(false)
   const [showRecherche ,setShowRecherche] = useState(false)
   const liste_des_hotels =  hotels.results
   
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 sm:w-16 h-10 sm:h-16 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium  sm:text-xs text-md">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!liste_des_hotels) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-4">Produit introuvable</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-orange-400 text-white rounded-xl font-bold hover:bg-orange-500 transition"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }
  
  
    
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
               liste_des_hotels.map((hotel) => (
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
