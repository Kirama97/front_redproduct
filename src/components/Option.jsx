import React from 'react'
import { MdOutlineDeleteSweep } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";





const Option = ({id , showEdite , setShowEdite , showDelete , setShowDelete}) => {

    
    const handleDelete = async () => {
       await setShowDelete(!showDelete)
    }

    const handleEdite = async () => {
        await setShowEdite(!showEdite)
        
    }


  return (
    <div className='absolute bottom-10  right-7    flex flex-col gap-3 '>
        <button 
          onClick={() => handleDelete()}
          title='supprimer'
        className=' group hover:bg-red-500 border-2 border-red-400 bg-neutral-100 shadow-lg rounded-full p-3 flex transition duration-300 ease-linear items-center justify-center'>
            <MdOutlineDeleteSweep  className='text-red-400 group-hover:text-white' />
        </button>
        <button
           onClick={() => handleEdite()}
           title='modifier'
         className='group hover:bg-yellow-400 bg-neutral-100 border-2 border-yellow-400 rounded-full p-3 flex transition duration-200 ease-linear items-center justify-center'>
            <MdModeEditOutline  className=' text-yellow-400 group-hover:text-white' />
        </button>
      
    </div>
  )
}

export default Option
