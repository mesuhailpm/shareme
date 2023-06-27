import React, { useEffect, useState } from 'react'
import { singlePinQuery, morePinsQuery } from '../utils/generateQuery'
import { Link, useParams } from 'react-router-dom'
import { client,urlFor } from '../client'
import { MdDownloadForOffline } from 'react-icons/md'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import {v4 as uuidv4 } from 'uuid'

const PinDetails = ({user}) => {

    const {pinId}  = useParams()
    const [pin,setPin] = useState() //currentPin
    const [pins, setPins] = useState() //similiar pins
    console.log(pin,' is pin and ')
    const [isCommenting, setIsCommenting] = useState(false)
    const [comment,setComment] = useState('')






    const fetchPinDetails = () =>{
        let query = singlePinQuery(pinId)
        client.fetch(query)
        .then((result)=> {console.log(result)
            setPin(result[0])
            if(result[0]){
                query = morePinsQuery(result[0])
                client.fetch(query)
                .then((result)=> setPins(result))
                .catch((err)=>console.log(err))
            }

        })
        .catch((error)=>console.log(error))

    }

    useEffect(()=>{
        fetchPinDetails()
    },[pinId])

    const saveComment = () => {
        setIsCommenting(true)
        client.patch(pinId)
        .setIfMissing({comments:[]})
        .insert('after','comments[-1]',[{
            _type:'comment',
            _key: uuidv4(),
            postedBy:{
                _type:'postedBy',
                _ref:user._id
            },
            comment
        }])
        .commit()
        .then(()=> {
            fetchPinDetails()
            setIsCommenting(false)
            setComment('')
        })
        .catch((err)=>console.log(err))

    }

    if(!pin) return <Spinner  message='Please wait until we got ideas... ' />

    return(
    <>
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{maxWidth: '1500px', borderRadius:'32px'}}>
            <div className="flex justify-center items-center md:items-start flex-initial">
                <img
                src= {pin?.image &&  urlFor(pin.image).url()}
                className="rounded-t-3xl rounded-b-lg"
                alt='user-post'
                />
            </div>
            <div className='w-full p-5 flex-1 xl:min-w-620'>
                <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                            <a
                                href={`${pin?.image?.asset.url}?dl=`}
                                download
                                className='bg-secondaryColor p-2 text-xl rounded-full flex justify-center items-center text-dark opacity-75 haver:opacity-100 '
                            >
                                <MdDownloadForOffline/>

                            </a>
                        </div>
                        <a
                            href={pin.destination}
                            target='_blank'
                            rel='noreferrer'
                        >
                            {pin.destination?.slice(8)}
                        </a>


                </div>
                        <div>
                            <h1 className = 'text-4x-1 font-bold break-words mt-3'>{pin.title}</h1>
                            <p className = 'mt-3'>{pin.about}</p>
                        </div>
                        <Link to={`/user-profile/${pin.postedBy?._id}` }className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
                            <img src={pin.postedBy?.image} alt="user-profile" className='w-8 h-x rounded-full object-cover' />
                            <p className='font-semibold capitalize'>{pin.postedBy?.userName}</p>
                        </Link>
                        <p><span>Category: </span>{pin?.category}</p>{/*test*/}
                        <h2 className='mt-5 text-2xl'>Comments</h2>
                        <div className='max-h-370 overflow-y-auto'>
                            {pin?.comments?.map((comment,index)=> (
                                <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={index}>
                                    <img src={comment.postedBy.image}
                                    alt='user-profile'
                                    className='w-10 h10 rounded-full cursor-pointer'
                                    />
                                    <div className='flex flex-col'>
                                        <p className='font-bold'>{comment.postedBy.userName}</p>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            ))}
                            <div className='flex flex-wrap mt-6 gap-3'>
                                <Link to={`/user-profile/${pin.postedBy?._id}` }>
                                    <img src={pin.postedBy?.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer' />
                                </Link>
                                <input type='text'
                                    className='flex-1 border-gray-200 outline-none border-2 p-2 rounded-2xl focus:border-gray-4 00'
                                    value={comment}
                                    placeholder='Type a comment '
                                    onChange={(e)=> setComment(e.target.value)}
                                />
                                <button className='bg-red-500 text-base text-white px-6 py-2 rounded-full outline-none shadow opacity-100 hover:' onClick={saveComment} disabled={!user}>

                                    {isCommenting ? 'Posting...' : 'Post'}

                                </button>


                            </div>
                        </div>
            </div>



        </div>
        {pins?.length ? (
            <h2 className='text-center font-bold text-2x-l mt-8 mb-4'>More pins Like this...</h2>
        ):(
            <></>
        ) }
        {pins ? (
                <MasonryLayout pins={pins} />
            ):(

                <Spinner />
            )
            }
</>

    )
}
export default PinDetails
