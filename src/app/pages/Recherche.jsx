import React from 'react'


const Recherche = ({showRecherche , setShowRecherche}) => {
  return (
    <div className='  w-full h-full  '>
         <div className=" w-40 h-80 bg-white rounded-lg p-5 border border-black ">
            <input type="text"
              placeholder='Recherche'
             className='px-2 py-1 my-2 text-xs placeholder:text-xs placeholder:text-neutral-500' />

         </div>
        
    </div>
  )
}

export default Recherche
