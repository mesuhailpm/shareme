import React,{useState, useEffect} from 'react'
import { useNavigate , useParams} from 'react-router-dom'
import { client } from '../client'
import { userProfileQuery, savedPinsQuery, createdPinsQuery } from '../utils/generateQuery'
import { googleLogout } from '@react-oauth/google'
import {AiOutlineLogout} from 'react-icons/ai'
import Masonrylayout from './MasonryLayout'
import Spinner from './Spinner'



const UserProfile = (props) => {
  const navigate = useNavigate()
  const {userId} = useParams()
  const currentUser = props.user;
  const [user,setUser] = useState()
  const [text, setText] = useState('Created')
  const [pins,setPins] = useState([])
  const [loading, setLoading] = useState(false)

  const fethUserProfile = () => {
    const query = userProfileQuery (userId)

    client.fetch(query)
      .then((resultArray)=>setUser(resultArray[0]))
      .catch((err)=>console.log(err))

  }

  const fetchSavedPins = () => {
    const query = savedPinsQuery(userId)
    client.fetch(query).then((res)=> setPins(res))
      .catch((err)=>console.log(err))

  }

  const fetchCreatedPins = () => {
    const query = createdPinsQuery(userId)
    client.fetch(query).then((res)=> setPins(res))
      .catch((err)=>console.log(err))
  }


  useEffect(()=>{

    fethUserProfile()
  },[userId])


  useEffect(()=>{
    if (text === 'Created'){
      fetchCreatedPins()

    }else{
      fetchSavedPins()
    }
  },[userId,text])


  const handleLogout = () =>{
    googleLogout()
    localStorage.clear()
    navigate('/login')
  }

  const activeButtonStyles = 'bg-red-500 text-white px-3 py-1 rounded-lg'
  const inactiveButtonStyles = 'bg-white-500 text-black px-3 py-1 rounded-lg'


  return (
    loading ? <Spinner />
    :
    (<div className="relative pb-2 h-full justify-center items-center">

      <div className='flex flex-col pb-5'>
        <div className='relative w-full flex flex-col justify-center items-center'>
          <img
          src="https://source.unsplash.com/random/1600×900/?nature,photography,memory,technology"
          alt="random-pic"
          className='w-full h-370 2xl:h-510 shadow-lg object-cover'
          />

          <img  className='rounded-lg -mt-10 shadow-xl w-20 h-20 object-cover'
                src={user?.image} alt="user-pic"
          />

        </div>
        <h1 className="font-bold text-3xl text-center mt-3">
              {user?.userName}
        </h1>
        {currentUser ? <div className="absolute top-1 z-1 right-1">
          <button onClick={handleLogout}>
            <div className='flex justify-center gap-1 items-center rounded-lg bg-red-500 p-3'>
              <p className='md:text-4xl'>
                <AiOutlineLogout />
              </p>
                Log out
            </div>
          </button>

        </div>
        : <></>}

      </div>
      <div className='text-center mb-7'>
        <button
        onClick={(e)=> setText(e.target.textContent)}
        className = {`${text === 'Created' ? activeButtonStyles : inactiveButtonStyles }`}
        >

          Created
        </button>

        <button
        onClick={(e)=> setText(e.target.textContent)}
        className = {`${text === 'Saved' ? activeButtonStyles : inactiveButtonStyles }`}
        >
          Saved
        </button>

      </div>
      {pins?.length?  (
        <Masonrylayout pins = {pins}/>
      ):
      <p> No pins found</p>}
    </div>)
  )
}

export default UserProfile
