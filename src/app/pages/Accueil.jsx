import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { useAuth } from '../../context/AuthContext';
import { useHotels } from '../../context/HotelContext';
import { Link } from 'react-router';

const Accueil = () => {
  const { utilisateurs ,nombre_utilisateur } = useAuth()
  const { hotels } = useHotels()

  return (
    <div>
      {/* top */}
      <div className="flex items-center bg-neutral-50 w-full px-5 py-4">
        <div>
          <h3 className='text-xl text-neutral-600'>
            Bienvenue sur RED PRODUCT
          </h3>
          <p className='text-xs text-neutral-500'>
            Tableau de bord pour gérer vos hôtels, utilisateurs et activités
          </p>
        </div>
      </div>

      {/* dash */}
      <div className="px-5 pt-5 pb-20 max-sm:h-[80vh] overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* 1 - Formulaires */}
        <div className="p-4 flex gap-5 bg-white rounded-lg group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150">
          <div className="w-10 h-10 text-white text-xs rounded-full flex items-center justify-center p-2 bg-[#A88ADD]">
            <FaEnvelopeOpen />
          </div>
          <div>
            <h4 className='text-neutral-600'>
              <span className='text-xl font-semibold mr-2 group-hover:text-[#A88ADD]'>
                125
              </span>
              Formulaires
            </h4>
            <p className='text-xs text-zinc-600'>
              Nombre total de formulaires soumis par les utilisateurs
            </p>
          </div>
        </div>

        {/* 2 - Messages */}
        <div className="p-4 flex gap-5 bg-white rounded-lg group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150">
          <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#0CC2AA]">
            <span className='text-xl font-bold text-white'>P</span>
          </div>
          <div>
            <h4 className='text-neutral-600'>
              <span className='text-xl mr-2 font-semibold group-hover:text-[#0CC2AA]'>
                40
              </span>
              Messages
            </h4>
            <p className='text-xs text-zinc-600'>
              Messages reçus via la plateforme
            </p>
          </div>
        </div>

        {/* 3 - Utilisateurs */}
        <div className="p-4 flex gap-5 bg-white rounded-lg group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150">
          <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#FCC100]">
            <FaUserFriends className='text-xs text-white' />
          </div>
          <Link to='/utilisateurs'>
            <h4 className='text-neutral-600'>
              <span className='text-xl mr-2 font-semibold group-hover:text-[#FCC100]'>
                {nombre_utilisateur || 0}
              </span>
              Utilisateurs
            </h4>
            <p className='text-xs text-zinc-600'>
              Nombre total d'utilisateurs inscrits
            </p>
          </Link>
        </div>

        {/* 4 - Emails */}
        <div className="p-4 flex gap-5 bg-white rounded-lg group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150">
          <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#F90000]">
            <FaEnvelopeOpen className='text-white text-xs' />
          </div>
          <div>
            <h4 className='text-neutral-600'>
              <span className='text-xl mr-2 font-semibold group-hover:text-[#F90000]'>
                25
              </span>
              Emails
            </h4>
            <p className='text-xs text-zinc-600'>
              Emails envoyés ou reçus par le système
            </p>
          </div>
        </div>

        {/* 5 - Hotels */}
        <div className="p-4 flex gap-5 bg-white rounded-lg group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150">
          <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#9C27B0]">
            <span className='text-xl font-semibold text-white'>H</span>
          </div>
          <div>
            <h4 className='text-neutral-600'>
              <span className='text-xl mr-2 font-semibold group-hover:text-[#9C27B0]'>
                {hotels?.length || 0}
              </span>
              Hotels
            </h4>
            <p className='text-xs text-zinc-600'>
              Nombre total d'hôtels disponibles sur la plateforme
            </p>
          </div>
        </div>

        {/* 6 - Entités */}
        <div className="p-4 flex gap-5 bg-white rounded-lg group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150">
          <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#1565C0]">
            <FaUserFriends className='text-xs text-white' />
          </div>
          <div>
            <h4 className='text-neutral-600'>
              <span className='text-xl mr-2 font-semibold group-hover:text-[#1565C0]'>
                02
              </span>
              Entités
            </h4>
            <p className='text-xs text-zinc-600'>
              Structures ou partenaires enregistrés
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Accueil