import React, { useEffect } from 'react'
import MovieListing from '../features/movies/MovieListing'

const Home = () => {
  
  return (
  <>
    <div className='banner-img'></div> 
    {/* TODO: what is this ^? */}
    <MovieListing />
  </>
  )
}

export default Home