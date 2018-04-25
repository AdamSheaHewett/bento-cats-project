import React from 'react';

const CatCard = props => (
  <div className='card' style={{display: props.display}}>
    <div className='card-image'>
      <figure className='image'>
        <img src={props.image} alt='cat' />
      </figure>
    </div>
    <div className='card-content'>
      <div className='content columns is-vcentered is-mobile'>
        <div className='column is-9'>
          <p className=''>
            {props.fact}
          </p>
        </div>
        <div className='column is-2 is-offset-1'>
          {props.children}
        </div>
      </div>
    </div>
  </div>
);

export default CatCard;
