import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { urlFor,client } from '../client'
import fetchUser from '../utils/fetchUser'


const Pin = ({ pin: {postedBy,destination,image,save,_id},pin } ) => {
  console.log(pin) //test
  const user = fetchUser()
  const [isHovering, setIsHovering] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  
  const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user.id))?.length
  console.log(alreadySaved) //test
  //[2,3,1] -> [3] -> .length -> 1 !1 -> 0 !0-> true
  //[2,3,1] -> [] -> .length -> 0 !0 -> true !true false
  const navigate = useNavigate()
  
  const savePin = (id) => {
    console.log(id)
    if(!alreadySaved)
    {setSavingPost(true)

      client
      .patch(id)
      .setIfMissing({save:[]})
      .insert('after','save[-1]',[{
        _key: uuidv4(),
        userId: user.id,
        _type:'save',
        postedBy:{
          _type:'postedBy',
          _ref: user.id,


        }
      }])
      .commit()
      .then(()=>{
        window.location.reload();
      })


    }
  
  }
  
  
  
  return (
    <div className='m-2'>
      <div className='relative cursor-zoom-in w-auto rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        onMouseEnter={()=>setIsHovering(true)}
        onMouseLeave={()=>setIsHovering(false)}
        onClick={()=>navigate(`/pin-detail/${_id}`)}
      
      >

      <img src={urlFor(image).width(250).url()} alt='user-post' className='rounded-lg w-full' />
      {isHovering && (
        <div className='absolute top-0 flex flex-col justify-between w-full h-full p-1 pt-2 pr-2 pb-2 z-50'
          style={{ height:'100%'}} >
          <div className='flex justify-between items-center'>
            <div className='flex gap-2'>
              <a  href={`${image?.asset?.url}?dl=`}
                  download
                  
              >
                  <MdDownloadForOffline 
                  className='bg-white  w-9 h-9 flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                  onClick={(e) => e.stopPropagation()} />

              </a>

            </div>
            {alreadySaved ? (
              <button className='bg-red-500 opaicty-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                {save?.length} Saved
              </button>
            ):(
              <button className='bg-red-500 opaicty-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
              onClick={(e)=>{
                e.stopPropagation()
                savePin(_id)
              }}>
                {savingPost? 'Saving..' :'Save now'}
              </button>
            )}

          </div>
        </div>)
      }
      </div>
    </div>
  )
}

export default Pin