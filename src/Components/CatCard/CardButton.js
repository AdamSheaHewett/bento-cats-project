import React from 'react';

// this component is used in the higher-level App component to
// control the state of the App

const CardButton = props => (
  <button className='button' {...props}>{props.children}</button>
);

export default CardButton;
