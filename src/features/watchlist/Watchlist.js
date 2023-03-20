import React from 'react'
import { useSelector } from 'react-redux'
import './Watchlist.scss'
import WatchlistCard from './WatchlistCard'

const Watchlist = () => {
  const { watchlist } = useSelector((state) => state.movies);

  return (
    <div className='watchlist-wrapper'>
        <div className='movie-list'>
            <h2>My Watchlist</h2>
            <div className='watchlist-container'>
                { watchlist && watchlist.length && watchlist.map(movie => <WatchlistCard key={movie.backdrop_path} data={movie} />)}
            </div>
        </div>
    </div>
  )
}

export default Watchlist