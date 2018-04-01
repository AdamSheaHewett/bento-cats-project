import React, { Component } from 'react';
import Header from './Components/Header/Header.js';
import HeaderButton from './Components/Header/HeaderButton.js';
import CatCard from './Components/CatCard/CatCard.js';
import CardButton from './Components/CatCard/CardButton.js';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      facts: [],
      favorited: false
    };
    this.handleFavClick = this.handleFavClick.bind(this);
    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
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
        this.setState({images: imageArray});
      }, (error) => {
        console.log('error:', error);
      });
    fetch('http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25')
      .then(res => res.json())
      .then((result) => {
        let factArray = JSON.parse(result.body).data;
        this.setState({facts: factArray});
      }, (error) => {
        console.log('error:', error);
      });
  }

  handleFavClick (event) {
    event.preventDefault();
    console.log(this);
  }

  handleFavoriteButton (id) {
    // event.preventDefault();
    if (this.state.favorited) {
      this.setState({favorited: false});
    } else {
      this.setState({favorited: true});
    }
  }

  render () {
    const facts = this.state.facts.map((fact) =>
      fact.fact
    );
    return (
      <div>
        <Header>
          <HeaderButton>
            Sort by last word in fact.
          </HeaderButton>
          <HeaderButton
            onClick={this.handleFavClick}
          >
            Show only favorited cats
          </HeaderButton>
          <HeaderButton>
            Show only one at a time.
          </HeaderButton>
        </Header>
        <div className='columns'>
          <div className='column is-6 is-offset-3'>
            {this.state.images.map((image, i) =>
              <CatCard key={i}
                image={image}
                fact={facts[i]}
              >
                <CardButton
                  onClick={() => this.handleFavoriteButton}
                >
                  {this.state.favorited ? 'Unfavorite' : 'Favorite'}
                </CardButton>
              </CatCard>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
