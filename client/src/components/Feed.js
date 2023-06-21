import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import {searchQuery, feedQuery} from '../utils/generateQuery'


const Feed = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [pins,setPins] = useState(null)
    const {categoryId} = useParams()

    useEffect(() => {
        if(categoryId) {
            setIsLoading(true)
            client.fetch(searchQuery(categoryId)) 
            .then((data) => setPins(data))
            setIsLoading(false)

        }else {
            setIsLoading(true)
            client.fetch(feedQuery)
            .then((data) => setPins(data))
            setIsLoading(false)
        }
    },[])

    if(isLoading) return (<Spinner message={`Please wait we are adding new ideas to your field`} />)
    return(
        <div>
         {pins && <MasonryLayout pins={pins} />}
        </div>
    )
}
export default Feed
