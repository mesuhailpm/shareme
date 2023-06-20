import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { client } from '../client'
import logo from '../assests/logo.png'
import { Link,Route,Routes } from 'react-router-dom'
import Pins from '../containers/Pins'
import UserProfile from '../components/UserProfile'
import {userQuery} from '../utils/generateQuery'

const Home = () => {
  const [showSideBar, setShowSideBar] = useState (false)
  const [user,setUser] = useState(null)
  const scrollRef = useRef(null);


  const userInfo = localStorage.getItem('profileObj') !== undefined ? JSON.parse(localStorage.getItem('profileObj')) : localStorage.clear()



  useEffect(() =>{
    client.fetch(userQuery(userInfo?.id))
    .then((res) => {
        console.log(res[0])
        setUser(res[0])
      })
  },[])

  useEffect(() =>{
    scrollRef.current.scrollTo(0,0)
  },[])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user = {user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setShowSideBar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
        </div>
        {showSideBar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setShowSideBar(false)} />
          </div>
          <Sidebar setShowSideBar={setShowSideBar} user={user && user} />
        </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
