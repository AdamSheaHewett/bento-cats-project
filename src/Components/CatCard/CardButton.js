import React from 'react';

const CardButton = props => (
  <button className='button is-primary' {...props}>{props.children}</button>
);

export default CardButton;
