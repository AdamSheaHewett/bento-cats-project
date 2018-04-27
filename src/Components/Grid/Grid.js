import React from 'react';

const Grid = props => (
  <div className='columns'>
    <div className='column is-4'>
      {props.children}
    </div>
    <div className='column is-4'>
      {props.children}
    </div>
    <div className='column is-4'>
      {props.children}
    </div>
  </div>
);

export default Grid;
