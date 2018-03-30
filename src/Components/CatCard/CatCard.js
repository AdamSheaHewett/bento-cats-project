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
      <div className='content columns is-vcentered'>
        <div className='column is-9'>
          <p className=''>
            {props.fact}
          </p>
        </div>
        <div className='column is-2 is-offset-1'>
          <button className='button'>Favorite</button>
        </div>
      </div>
    </div>
  </div>
);

export default CatCard;
