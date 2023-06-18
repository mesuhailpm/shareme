import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { client } from '../client'

const Home = () => {
  const [showSideBar, setToggleSidebar] = useState (false)

  const userInfo = localStorage.getItem('profileObj') !== undefined ? JSON.parse(localStorage.getItem('profileObj')) : localStorage.cleear()

  const generateQuery = (userId) => {
    const query = `*[_type =='user' && _id == '${userId}]`
    return query
  }

  // useEffect(() =>{
  //   client.fetch(generateQuery(userInfo))
  //   .then((res) => {
  //       console.log(res)
  //     })
  // },[])



  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height durataion-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className='flex md:hidden flex-row'>
        <HiMenu  fontSize={40} className='cursor-pointer self-flex-end' onClick={()=>setToggleSidebar(true)}/>
        {showSideBar && (
          <>
          <Sidebar />
          <AiFillCloseCircle fontSize={40} className='cursor-pointer' onClick={()=>setToggleSidebar(false)}/>
          </>

        )}
      </div>
    </div>
  )
}

export default Home