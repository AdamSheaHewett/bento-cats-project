import React from 'react';

// have state to hold api call data, and whether cat has been favorited or not

// api calls to image, and fact APIs using axios

const CatCard = props => (
  <div className='card'>
    <div class='card-image'>
      <figure class='image is-4by3'>
        <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
      </figure>
    </div>
    <div className='card-content'>
      <div className='content level'>
        <div className='level-left'>
          <span className='level-item'>
            CAT FACT
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
