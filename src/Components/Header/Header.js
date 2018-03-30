import React from 'react';
import './Header.css';

const Header = props => (
  <div className='header level is-mobile'>
    <div className='level-item has-text-centered'>
      <div>
        <button className='button is-large'>Sort by last word in fact.</button>
      </div>
    </div>
    <div className='level-item has-text-centered'>
      <div>
        <button className='button is-large'>Show only favorited cats.</button>
      </div>
    </div>
    <div className='level-item has-text-centered'>
      <div>
        <button className='button is-large'>Show only one at a time.</button>
      </div>
    </div>
  </div>
);

export default Header;
