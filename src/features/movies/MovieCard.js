import React, {useEffect} from 'react'
import './MovieCard.scss'
import * as Icon from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import StarRating from '../starRating/StarRating'
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlistAction, RemoveFromWatchlistAction } from '../../redux/Actions'
import nophoto from '../../images/nophoto.jpg';
import { IMGPATH } from '../../common/constants'

const MovieCard = (props) => {
  const { watchlist } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const { data } = props;
  const initialRatings = JSON.parse(localStorage.getItem(`ratings-${data.id}`));
  const[rating, setRating] = useState(initialRatings);
  
  // formatting movie premier date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const premierDate = new Date(data.release_date).toLocaleDateString("en-GB", options)

  const [show, setShow] = useState(false);
  const [moreInfoshow, setMoreInfoShow] = useState(false);

  const handleRateModalClose = () => { setShow(false); }
  const handleRateModalShow = () => setShow(true);

  const handleMoreInfoModalShow = () => setMoreInfoShow(true);
  const handleMoreInfoModalClose = () => setMoreInfoShow(false);
  

  useEffect(() => {
    localStorage.setItem(`ratings-${data.id}`, JSON.stringify(rating));
    console.log("rating", rating)

  }, [rating, data.id])


  const handleRate = () => {
    setShow(false);
  }

  const removeRate = () => {
    setRating(0);
    setShow(false);
  }

  const onStarButtonClick = (index) => {  
    setRating(index);
  }

  const handleWatchlist = () => {
    dispatch(
      watchlist.find((m) => m.id == data.id)
        ? RemoveFromWatchlistAction(data.id)
        : addWatchlistAction(data)
    )
  };


  return (
    <>
      <div className='card-item'>
        <div className='card-inner'>
          <div className='card-top'>
            <img src={ data.poster_path ? IMGPATH + data.poster_path : nophoto  } alt={data.title} onClick={handleMoreInfoModalShow}/>
          </div>
          <div className='card-bottom'>
            <div className='rating-star-group'>
              <span><Icon.StarFill color="#f5c518"/>{' '}<span className='rating-number'>{data.vote_average}</span></span>
              {!rating ? 
              <Button onClick={handleRateModalShow} variant="outline-light" className='rate-button'><Icon.Star color="#5799ef"/></Button> : 
              <span onClick={handleRateModalShow} className='rating-span'><Icon.StarFill color="#5799ef"/>{' '}<span className='rating-number'>{rating}</span></span>}
            </div>
            <div className='card-info'>
              <h4 className='movie-title'>{data.title}</h4>
              <Button className="add-watchlist" variant="outline-primary" onClick={handleWatchlist}>{watchlist.find((m) => m.id === data.id) ? <i className="fa-solid fa-check"></i> : <i className="fa-sharp fa-solid fa-plus"></i>} Watchlist</Button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        show={moreInfoshow} 
        onHide={handleMoreInfoModalClose} 
        dialogClassName='more-info-modal'
        centered>
        <Modal.Body>
          <div className='image-container'>
            <img className="more-info-img" src={ data.poster_path ? IMGPATH + data.poster_path : nophoto  } alt={data.title} />
          </div>
          <div className='more-info-card-content'>
            <div className='card-title'>{data.title}</div>
            <div className='release-date'>Premier date: {premierDate}</div>
            <div className='card-rating'><span className='rating-span'><Icon.StarFill color="#f5c518"/>{' '}<span className='rating-number'>{data.vote_average} of {data.vote_count} votes</span></span></div>
            <div className='movie-overview'>{data.overview}</div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal 
        show={show} 
        onHide={handleRateModalClose}
        dialogClassName='rate-modal'>
        <Modal.Header closeButton>
          <Modal.Title><div className='rate-this'>Rate this:</div><p className='title'>{data.title}</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StarRating starFunction={onStarButtonClick} currentRating={rating}/> 
        </Modal.Body>
        <Modal.Footer>
          <Button className="rate-close-button" variant="warning" onClick={handleRate}>
            Rate
          </Button>
          { rating ?<Button className="remove-rating-button" variant="outline-light" onClick={removeRate}>Remove rating</Button> : null}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MovieCard