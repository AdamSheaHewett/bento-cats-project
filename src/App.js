import React, { Component } from 'react';
// import axios from 'axios';
import Header from './Components/Header/Header.js';
import CatCard from './Components/CatCard/CatCard.js';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      facts: []
    };
  }

  componentDidMount () {
    fetch('http://thecatapi.com/api/images/get?format=xml&results_per_page=25')
      .then(res => res.text())
      .then(result => (new window.DOMParser()).parseFromString(result, 'text/xml'))
      .then((data) => {
        let imageArray = [];
        // the number 25 is hard-coded for the demonstration from the given API
        for (let i = 0; i < 25; i++) {
          imageArray.push((data.getElementsByTagName('image')[i].childNodes[1].innerHTML));
        }
        console.log(imageArray);
        this.setState({images: imageArray});
      }, (error) => {
        console.log('error:', error);
      });
  }

  // for each fact that comes from the api, also put it into a CatCard

  render () {
    return (
      <div>
        <Header />
        <div className='columns'>
          <div className='column is-6 is-offset-3'>
            {this.state.images.map((image, index) =>
              <CatCard image={image} key={index} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
