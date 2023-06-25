import React, { useEffect, useState } from 'react'
import { singlePinQuery, morePinsQuery } from '../utils/generateQuery'
import { Link, useParams } from 'react-router-dom'
import { client,urlFor } from '../client'
import { MdDownloadForOffline } from 'react-icons/md'
import Spinner from './Spinner'

const PinDetails = ({user}) => {
    const {pinId}  = useParams()
    console.log(pinId)
    const [pin,setPin] = useState({})
    const [pins, setPins] = useState([])
    console.log(pin,' is pin and ')
    
    useEffect(()=>{
        let query = singlePinQuery(pinId)
        client.fetch(query).then((result)=> {console.log(result);setPin(result[0])}).catch((error)=>console.log(error))

        // if (pin) query = morePinsQuery(pin);
        // client.fetch(query).then((result)=> setPins(result)).catch((error)=>console.log(error))

    },[pinId])

    if(!pin) return <Spinner  message='Please wait until we got ideas... ' />

    return(
        <div className="flex xl:flex-row flex-column m-auto bg-white" style={{maxWidth: '1500px', borderRadius:'32px'}}>
            <div className="flex justify-center items-center md:items-start flex-initial ">
                <img 
                src= {pin?.image &&  urlFor(pin.image).url()}
                className="rounded-t-3xl rounded-b-lg"
                alt='user-post' 
                />
            </div>
            <div className='w-fu;; p-5 flex-1 xl:min-w-620'>
                <div className='flex items-ceter justify-between'>
                    <div className='flex items-center'>
                        <div  className='flex gap-2 items-center'>
                            <a
                             href={`${pin?.image?.asset.url}?dl=`}
                             download
                             className='bg-secondaryColor p-2 text-xl rounded-full flex justify-center items-center text-dark opacity-75 haver:opacity-100 '
                            >
                                <MdDownloadForOffline/>

                            </a>
                        </div>
                        <a 
                         href={`pin.destination`} target='_blank' rel='noreferrer'
                         >

                            {pin.destination?.slice(8)}


                        </a>
                    </div>
                    <div>
                        <h1 className='text-4x-1 font-bold break-words mt-3'>
                            {pin.title}
                        </h1>
                        <p className = 'mt-3'>
                            {pin.about}
                        </p>
                    </div>
                    

                    
                </div>
            </div>



        </div>
            
        
    )
}
export default PinDetails
