import React from 'react';

const CardButton = props => (
  <button className='button' {...props}>{props.children}</button>
);

export default CardButton;
