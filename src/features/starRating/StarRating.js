import React, { useState } from "react";
import './StarRating.scss'

const StarRating = (props) => {
    const {starFunction} = props;

    const [rating, setRating] = useState(props.currentRating);
    const [hover, setHover] = useState(0);

    const setAndPassRating = (index) => { 
        starFunction(index);
        setRating(index);
    }

    return (
      <div className="star-rating">
        {[...Array(10)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`star-button ${index <= (hover || rating) ? "on" : "off"}`}
              onClick={() => setAndPassRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  export default StarRating;