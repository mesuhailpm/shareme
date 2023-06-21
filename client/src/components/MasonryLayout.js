import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from '../components/Pin'

const MasonryLayout = ({pins}) => {
  const breakPointObj ={
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  }
  return (
    <div>
      <Masonry breakpointCols={breakPointObj} className='flex aimate-slide-fwd'>
        {pins.map((pin,index)=>(
          <Pin key = {index} pin={pin} />
        ))}
        

      </Masonry>
    </div>
  )
}

export default MasonryLayout