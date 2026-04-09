import React from 'react'
import { MdOutlineDeleteSweep } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";





const Option = ({id , showEdite , setShowEdite , showDelete , setShowDelete}) => {

    
    const handleDelete = async () => {
       await showDelete(!showDelete)
    }

    const handleEdite = async () => {
        await setShowEdite(!showEdite)
        
    }


  return (
    <div className='absolute bottom-10 right-7 w-10  flex flex-col gap-3 '>
        <button 
          onClick={() => handleDelete()}
          title='supprimer'
        className=' group hover:bg-black bg-yellow-400 rounded-full p-3 flex transition duration-300 ease-linear items-center justify-center'>
            <MdOutlineDeleteSweep  className='group-hover:text-white' />
        </button>
        <button
           onClick={() => handleEdite()}
           title='modifier'
         className='group hover:bg-black bg-yellow-400 rounded-full p-3 flex transition duration-200 ease-linear items-center justify-center'>
            <MdModeEditOutline  className='group-hover:text-white' />
        </button>
      
    </div>
  )
}

export default Option
