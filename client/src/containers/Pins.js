import React, { useState } from 'react'
import { Navbar, Feed, CreatePin, PinDetail, Search } from '../components'
import { Routes,Route } from 'react-router-dom'

const Pins = ({user}) => {
  const [searchTerm , setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
      <div className="bg-gray-50 flex justify-end">
        <Navbar user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div>
        <Routes>
          <Route path='/*' element={<Feed />} />
          <Route path ='/category/:categoryId' element={<Feed />} />
          <Route path ='/pin-detail/:pinId' element={<PinDetail user={user}/>} />
          <Route path ='/create-pin' element = {<CreatePin user={user} />}/>
          <Route path='/search' element={ <Search searchTerm={searchTerm}/>} />

        </Routes>

      </div>

    </div>
  )
}

export default Pins
