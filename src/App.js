import React, { Component } from 'react';
import Header from './Components/Header/Header.js';
import CatCard from './Components/CatCard/CatCard.js';
import './App.css';

// have state that has array to hold CatCards, map over array of CatCards
// and put them onto the grid

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <div className='columns'>
          <div className='column is-4'>
            <CatCard />
          </div>
          <div className='column is-4'>
            <CatCard />
          </div>
          <div className='column is-4'>
            <CatCard />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
