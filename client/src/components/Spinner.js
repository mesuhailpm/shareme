import React from 'react'
import {Circles} from 'react-loader-spinner'

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col items-center'> //adding remaning classes
        <Circles 
        size={150}
        color='#402299'
        width={200}

         />
         <p className='text-center text-2xl m-5'>{message}</p>
    </div>
  )
}

export default Spinner