import React, { useState } from 'react'
import { Navbar, Feed, CreatePin, PinDetail, Search } from '../components'
import { Routes,Route } from 'react-router-dom'

const Pins = ({user}) => {
  const [searchTerm , setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
      <div className="bg-gray-50">
        <Navbar user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div>
        <Routes>
          <Route path='/*' element={<Feed />} />
          <Route path ='/category/:categoryId' element={<Feed />} />
          <Route path ='/pin-details/:pinId' element={<PinDetail />} />
          <Route path ='/create-pin' element = {<CreatePin />}/>
          <Route path='/search' element={ <Search />} />

        </Routes>

      </div>

    </div>
  )
}

export default Pins
