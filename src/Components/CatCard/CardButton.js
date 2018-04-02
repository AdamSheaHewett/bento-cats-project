import React from 'react';

// this component would be used in the higher-level App component to
// control the state of the App component as opposed to the Card compnent state

const CardButton = props => (
  <button className='button' {...props}>{props.children}</button>
);

export default CardButton;
