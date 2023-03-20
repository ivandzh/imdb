import React from 'react'
import { Link } from 'react-router-dom'
import user from './../images/user.png'
import { useSelector } from 'react-redux'
import "./Header.scss"
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const Header = () => {
  const { watchlist } = useSelector((state) => state.movies);
  const watchlistQuantity = watchlist.length;

  return (
    <div className='header'>
      <Link to='/'>
        <div className="logo">Star Movies</div>
      </Link>
      <div className='right-items'>
      <Link className='watchlist-link' to='/watchlist'>
        <Button variant="outline-light">
          Watchlist
          { watchlistQuantity !== 0 && 
            <Badge pill bg="warning" text="dark">{watchlistQuantity}</Badge>
          }
        </Button>
      </Link>
      <div className='user-image'>
        <img src={user} alt="user" />
      </div>
      </div>
    </div>
  )
}

export default Header