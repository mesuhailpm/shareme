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
    const [hasfetchedResult,setHasFetchedResult] = useState(false)

    useEffect(() => {
        if(categoryId) {
            setIsLoading(true);
            const query = searchQuery(categoryId)
            client
            .fetch(query)
            .then((data) => {
                setPins(data)
                setHasFetchedResult(true)
                setIsLoading(false)}
            )


        }else {
            setIsLoading(true);
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setIsLoading(false);})
        }
    },[categoryId])

    if(isLoading) return (<Spinner message={`Please wait we are adding new ideas to your field`} />)
    return(
        <div>
         {pins && <MasonryLayout pins={pins} />}
         {(hasfetchedResult && !pins?.length) && <p> No pins found for the criteria </p>}
        </div>
    )
}
export default Feed
