import React from 'react';
import './Header.css';

const Header = props => (
  <div className='header level is-mobile'>
    {props.children}
  </div>
);

export default Header;
