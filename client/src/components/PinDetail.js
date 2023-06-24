import React, { useEffect, useState } from 'react'
import { singlePinQuery } from '../utils/generateQuery'
import { useParams } from 'react-router-dom'
import { client } from '../client'

const PinDetails = () => {
    const {id}  = useParams()
    const [pin,setPin] = useState({})


    useEffect(()=>{
        const query = singlePinQuery(id)
        client.fetch(query).then((result)=> setPin(result)).catch((error)=>console.log(error))

    })
    return(
        <div className="flex">

        </div>
            
        
    )
}
export default PinDetails
