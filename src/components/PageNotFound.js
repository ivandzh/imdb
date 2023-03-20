import React from 'react'
import './PageNotFound.scss'

const PageNotFound = () => {
  return (
    <div className='page-wrapper'>
      <h1>404</h1>
        <div className='cloak-wrapper'>
          <div className='cloak-container'>
            <div className='cloak'></div>
          </div>
        </div>
        <div className='info'>
          <h2>We can't find that page</h2>
          <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p>
          <a href="https://www.w3schools.com">Home</a>
        </div>
    </div>
  )
}

export default PageNotFound