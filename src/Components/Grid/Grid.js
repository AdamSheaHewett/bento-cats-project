import React from 'react';

const Grid = props => (
  <div className='columns is-multiline'>
    {props.children}
  </div>
);

export default Grid;
