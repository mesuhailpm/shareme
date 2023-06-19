import React from 'react'
import logo from '../assests/logo.png'
import { NavLink,Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'

const Sidebar = ({user, setShowSideBar }) => {
  const isActiveStyle = 'flex items-center tex-gray-500 gap-5'
  const isNotActiveStyle = 'flex items-center'
  const handleToggleSidebar = () => {
    if (setShowSideBar) {
      setShowSideBar(false)
    }
    }
  const categories = [ 
    {name: 'sports'},
    {name: 'entertainment'},
    {name: 'health'},
    {name: 'fashion'},
    {name: 'travel'},
    {name: 'other'},
  ]
  return (
    <div className='Flex flex-col'>
      <Link className="flex justify-center m-6" to='/'>
        <img src={logo} alt='app-logo' className='w-28' />
      </Link>
      <div className='flex items-center p-5 gap-5'></div>
      <NavLink 
      className={(isActive)=> isActive ? isActiveStyle : isNotActiveStyle}   to='/'
      onClick={handleToggleSidebar}
      >
        <RiHomeFill/>
        
        <p> Home</p>
      </NavLink>
      <p className='mt-2 px-5 text-base 2xl text-xl'> Discover</p>
      {categories.slice(0,categories.length-1).map((category)=>(
        <NavLink to={`/category/${category.name}`}
        className={(isActive)=> isActiveStyle? isActiveStyle:isNotActiveStyle}
        key={category.name} onClick={handleToggleSidebar}
        >
          <p>{category.name}</p>
      

        </NavLink>
        ))}

    </div>
  )
}

export default Sidebar