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
        console.log('useEffect ran with categoryId: ' + categoryId)
        if(categoryId) {
            setIsLoading(true)
            const query = searchQuery(categoryId)
            client
            .fetch(query) 
            .then((data) => setPins(data))
            setIsLoading(false)

        }else {
            setIsLoading(true);
            console.log('rendering pins');
            const timestamp = new Date().getTime();
            client.fetch(`feedQuery${timestamp}`)
            client.fetch(feedQuery).then((data) => {
                console.log('rendering pins save[] is ',`${data[0]?.save ? data[0]?.save[0].userId : 'not set'}`)
                setPins(data);
                setIsLoading(false);})
        }
    },[categoryId])

    if(isLoading) return (<Spinner message={`Please wait we are adding new ideas to your field`} />)
    return(
        <div>
         {pins && <MasonryLayout pins={pins} />}
        </div>
    )
}
export default Feed
