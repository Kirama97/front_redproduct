import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { useAuth } from '../../context/AuthContext';
import { useHotels } from '../../context/HotelContext';



const Accueil = () => {
   const { utilisateurs} = useAuth()
   const  { hotels} = useHotels()

  
    
  return (
    <div className=''>
       {/* top */}
       <div className="flex items-center bg-neutral-50 w-full  px-5 py-4">
         <div className=" h-full  ">
            <h3 className='text-xl text-neutral-600'>Bienvenue sur RED PRODUCT</h3>
            <p className='text-xs text-neutral-500'>Lorem ipsum dolor sit amet, ai iure quis saepe temporibus dolorem?</p>
         </div>
       </div>
        
         {/* dash */}

        <div className="px-5 pt-5 pb-20 max-sm:h-[80vh] overflow-y-auto grid  grid-cols-1 md:grid-cols-3 gap-5">
             {/* 1 */}
              <div className="p-4 flex  gap-5 bg-white rounded-lg group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150 ease-out ">

                 <div className="w-10 h-10 text-white text-xs rounded-full flex items-center justify-center p-2  bg-[#A88ADD] hover:bg-indigo-400">
                    <FaEnvelopeOpen  />
                 </div>

                  <div className="">
                     <h4 className='text-neutral-600'>
                      <span className='text-xl font-semibold mr-2 group-hover:text-[#A88ADD]'>125</span> 
                       Formulaires
                    </h4>
                    <p className='text-xs text-zinc-600'>je ne sais pas quoi mettre</p>
                  </div>
              

              </div>
               {/* 2 */}
              <div className="p-4 flex gap-5 bg-white rounded-lg  group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150 ease-out  ">

                 <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#0CC2AA]">
                   <span className='text-xl font-bold text-white'>P</span>
                 </div>

                  <div className="">
                     <h4 className='text-neutral-600'>
                      <span className='text-xl mr-2 font-semibold group-hover:text-[#0CC2AA]'>40</span> 
                       Message
                    </h4>
                    <p className='text-xs text-zinc-600'>je ne sais pas quoi mettre</p>
                  </div>
              

              </div>
               {/* 3 */}
              <div className="p-4 flex gap-5 bg-white rounded-lg  group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150 ease-out ">

                 <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#FCC100]">
                   <span className='text-md font-bold text-white'>
                       <FaUserFriends className='text-xs font-semibold text-white' />
                   </span>
                 </div>
                 
                  <div className="">
                     <h4 className='text-neutral-600'>
                      <span className='text-xl mr-2 font-semibold group-hover:text-[#FCC100] '>{utilisateurs.count}</span> 
                       Utilisateurs
                    </h4>
                    <p className='text-xs text-zinc-600'>je ne sais pas quoi mettre</p>
                  </div>
              

              </div>
               {/* 4 */}
              <div className="p-4 flex gap-5 bg-white rounded-lg  group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150 ease-out ">

                 <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#F90000]">
                     <FaEnvelopeOpen className='text-white text-xs'  />
                 </div>

                  <div className="">
                     <h4 className='text-neutral-600'>
                      <span className='text-xl mr-2 font-semibold group-hover:text-[#F90000] '>25</span> 
                       Email
                    </h4>
                    <p className='text-xs text-zinc-600'>je ne sais pas quoi mettre</p>
                  </div>
              

              </div>
               {/* 5 */}
              <div className="p-4 flex gap-5 bg-white rounded-lg  group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150 ease-out  ">

                 <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#9C27B0]">
                   <span className='text-xl font-semibold text-white'>P</span>
                 </div>

                  <div className="">
                     <h4 className='text-neutral-600'>
                      <span className='text-xl mr-2 font-semibold group-hover:text-[#9C27B0]'>{hotels.count}</span> 
                       Hotels
                    </h4>
                    <p className='text-xs text-zinc-600'>je ne sais pas quoi mettre</p>
                  </div>
              
              </div>
              {/* 6 */}
              <div className="p-4 flex gap-5 bg-white rounded-lg  group shadow-sm cursor-pointer hover:shadow-md hover:translate-y-1 hover:scale-105 duration-150 ease-out  ">

                 <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-[#1565C0]">
                     <FaUserFriends className='text-xs font-semibold text-white'  />
                 </div>

                  <div className="">
                     <h4 className='text-neutral-600'>
                      <span className='text-xl mr-2 font-semibold group-hover:text-[#1565C0]'>02</span> 
                       Entités
                    </h4>
                    <p className='text-xs text-zinc-600'>je ne sais pas quoi mettre</p>
                  </div>           

              </div>
           </div>
    </div>
  )
}

export default Accueil
