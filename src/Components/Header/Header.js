import React from 'react';
import './Header.css';

const Header = props => (
  <nav className='navbar is-info'>
    <div className='container'>
      <div className='navbar-brand'>
        <a className='navbar-item'>
          Get a load of these cats!
        </a>
        <div className='navbar-burger burger' data-target='navbarMenu' onClick={(e) => document.querySelector('.navbar-menu').classList.toggle('is-active')}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div id='navbarMenu' className='navbar-menu'>
        <div className='navbar-end'>
          {props.children}
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
