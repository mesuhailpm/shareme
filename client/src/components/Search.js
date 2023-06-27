import React, {useState, useEffect} from 'react';
import { searchQuery } from '../utils/generateQuery';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';



const Search = ({searchTerm}) => {
    const [pins,setPins] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(searchTerm !== ''){
            setIsLoading(true)
            const query  = searchQuery(searchTerm.toLowerCase())
            client.fetch(query)
                .then((response) => {
                    setIsLoading(false)
                    setPins(response)})
                .catch(err=>{
                    setIsLoading(false)
                    console.log(err)})
        }

    },
    [searchTerm])
    
    return(
        <div>
            {isLoading ? <Spinner message={`searching with '${searchTerm}'`}/>:
            <MasonryLayout pins = {pins}/>
            }
            {(searchTerm && !isLoading) && (
                <p> No pins matches your search</p>

            )}
        </div>
        
    )
}

export default Search
