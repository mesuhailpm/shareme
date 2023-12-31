import React from 'react'
import logo from '../assests/logo.png'
import { NavLink,Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import categories from '../utils/categories'

const Sidebar = ({user, setShowSideBar }) => {
  const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize'
  const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
  const handleToggleSidebar = () => {
    if (setShowSideBar) {
      setShowSideBar(false)
    }
    }
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar p-5">{/* added extra padding */}
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 py-1 w-190 items-center border-2 border-solid rounded-md"
          onClick={handleToggleSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleToggleSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
          {categories.slice(0, categories.length-1).map((category,index) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleToggleSidebar}
              key={index}
            >
              <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleToggleSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  )
}

export default Sidebar
