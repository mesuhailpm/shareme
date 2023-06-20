import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'


const Feed = () => {
    const [isLoding, setIsLoding] = useState(false)

    if(isLoding) return (<Spinner message={`Please wait we are adding new ideas to your field`} />)
    return(
        <div>
         Feed
        </div>
    )
}
export default Feed
