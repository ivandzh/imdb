import React from 'react'
import './WatchlistCard.scss'
import * as Icon from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlistAction, RemoveFromWatchlistAction } from '../../redux/Actions'
import nophoto from '../../images/nophoto.jpg'
import { IMGPATH } from '../../common/constants'

const WatchlistCard = (props) => {
  const { watchlist } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const { data } = props;

  const handleWatchlist = () => {
    dispatch(
      watchlist.find((m) => m.id === data.id)
        ? RemoveFromWatchlistAction(data.id)
        : addWatchlistAction(data)
    )
  };

  return (
    <div className='movie-item'>
      <div className='card-inner'>
          <img src={ data.poster_path ? IMGPATH + data.poster_path : nophoto  } alt={data.title} />
          <Button className="add-watchlist" variant="primary" onClick={handleWatchlist}>
            {watchlist.find((m) => m.id === data.id) ? <i className="fa-solid fa-check"></i> : <i className="fa-sharp fa-solid fa-plus"></i>} Remove 
          </Button>
        <div className='card-content'>
          <div className='card-title'>{data.title}</div>
          <div className='card-details'>{data.release_date}</div>
          <div className='card-rating'>
            <span className='rating-span'><Icon.StarFill color="#5799ef"/>{' '}<span className='rating-number'>{data.vote_average} of {data.vote_count} votes</span></span>
          </div>
          <div className='card-overview'>{data.overview}</div>
        </div>
      </div>
    </div>
  )
}

export default WatchlistCard