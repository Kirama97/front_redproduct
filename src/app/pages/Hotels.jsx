import React, { useState } from 'react';
import HotelItem from '../../components/HotelItem';
import AjouterHotel from '../../components/AjouterHotel';
import { CiSearch } from "react-icons/ci";
import Recherche from './Recherche';
import { useHotels } from '../../context/HotelContext';

const Hotels = () => {
  const { hotels, loading, searchTerm } = useHotels();
  const [ShowAddHotel, setShowAddHotel] = useState(false);
  const [showRecherche, setShowRecherche] = useState(false);
  
  const filteredHotels = (hotels || []).filter((hotel) =>
    hotel.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const compteurHotel = filteredHotels.length;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 sm:w-16 h-10 sm:h-16 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium sm:text-xs text-md">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-md font-semibold text-gray-900 mb-4">
            {!hotels ? "Hôtels introuvables" : "Vous n'avez aucun hôtel"}
          </p>
          <button
            onClick={() => setShowAddHotel(true)}
            className="px-6 py-3 bg-orange-400 text-white rounded-xl font-bold hover:bg-orange-500 transition"
          >
            Créer un hôtel
          </button>
          {ShowAddHotel && <AjouterHotel setShowAddHotel={setShowAddHotel} />}
        </div>
      </div>
    );
  }

  return (
    <div className='relative overflow-hidden'>
      {/* Top section */}
      <div className="flex items-center justify-between bg-neutral-50 px-5 py-5 sm:py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <p className='text-md text-neutral-800'>
            Hotels <span className="font-bold text-orange-400">{compteurHotel}</span>
          </p>
        </div>
        <button 
          onClick={() => setShowAddHotel(true)}
          className='px-5 py-1 text-sm border border-neutral-300 hover:bg-yellow-500 hover:text-white duration-300 ease-linear rounded-md'
        >
          + Créer un nouveau hôtel
        </button>
      </div>

      {/* Gallery Section */}
      <div className="px-5 pt-5 pb-[100px] overflow-y-scroll h-[86vh] sm:h-[84vh] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-10">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelItem hotel={hotel} key={hotel.id} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            Aucun hôtel ne correspond à votre recherche "{searchTerm}"
          </div>
        )}
      </div>

      {/* Overlays / Modals */}
      {ShowAddHotel && <AjouterHotel setShowAddHotel={setShowAddHotel} />}

      {/* Floating Action Button for search mobile/toggle */}
      <div className="absolute bottom-20 right-5 w-[60px] h-[60px] rounded-full shadow-lg shadow-neutral-400 bg-orange-400 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
        <button onClick={() => setShowRecherche(!showRecherche)}>
          <CiSearch className="text-2xl text-white" />
        </button>
      </div>
    
      {/* Search component */}
      <Recherche setShowRecherche={setShowRecherche} showRecherche={showRecherche} />
    </div>
  );
};

export default Hotels;
