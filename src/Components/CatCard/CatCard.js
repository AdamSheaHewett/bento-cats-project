import React from 'react';

// hold favorited state

const CatCard = props => (
  <div className='card'>
    <div className='card-image'>
      <figure className='image'>
        <img src={props.image} alt='cat' />
      </figure>
    </div>
    <div className='card-content'>
      <div className='content level'>
        <div className='level-left'>
          <span className='level-item'>
            {props.fact}
          </span>
        </div>
        <div className='level-right'>
          <button className='button level-item'>Favorite</button>
        </div>
      </div>
    </div>
  </div>
);

export default CatCard;
