import React, { Component } from 'react';
import Header from './Components/Header/Header.js';
import HeaderButton from './Components/Header/HeaderButton.js';
import CatCard from './Components/CatCard/CatCard.js';
// import CardButton from './Components/CatCard/CardButton.js';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cats: []
      // cat: {
      //   image: null,
      //   fact: null
      // }
      // images: [],
      // facts: [],
      // favorited: []
    };
    // a.fact.split(' ')[-1]
    this.handleSortClick = this.handleSortClick.bind(this);
    // this.handleFavClick = this.handleFavClick.bind(this);
    // this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
  }

  // once the component mounts, call both the image API and the fact API,
  // and store their responses in state
  componentDidMount () {
    var catArray = [];
    // var catObj = {};
    let imageArray = [];
    fetch('http://thecatapi.com/api/images/get?format=xml&results_per_page=25')
      .then(res => res.text())
      .then(result => (new window.DOMParser()).parseFromString(result, 'text/xml'))
      .then((data) => {
        // the number 25 is hard-coded for the demonstration from the given API
        for (let i = 0; i < 25; i++) {
          imageArray.push(
            (data.getElementsByTagName('image')[i].childNodes[1].innerHTML)
          );
        }
      }, (error) => {
        console.log('error:', error);
      })
      .then(
        fetch('http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25')
          .then(res => res.json())
          .then((result) => {
            let factArray = JSON.parse(result.body).data;
            for (let i = 0; i < factArray.length; i++) {
              var catObj = {};
              catObj['image'] = imageArray[i];
              catObj['fact'] = factArray[i].fact;
              catArray.push(catObj);
            }
            console.log(catArray);
            this.setState({cats: catArray});
          }, (error) => {
            console.log('error:', error);
          })
      );
  }

  // on the click of the "Sort by last word in fact." button, get the last word
  // in the fact, and sort them alphabetically
  handleSortClick (event) {
    event.preventDefault();
    var catObj = this.state.cats;
    catObj.sort(function (a, b) {
      var varA = a.fact.split(' ').splice(-1)[0];
      var varB = b.fact.split(' ').splice(-1)[0];
      if (varA < varB) {
        return -1;
      }
      if (varA > varB) {
        return 1;
      }
      return 0;
    });
    console.log(catObj);
    this.setState({cats: catObj});
  }

  // on the click of the "Show only favorited cats." button, show only cats that
  // have state favorited = true.
  handleFavClick (event) {
    event.preventDefault();
    console.log(this);
  }

  // on the click of the "Show only one at a time." button, display only one CatCard,
  // set OnlyOneShown state to true. if true, change to false and show all CatCards again.
  handleOnlyOneClick (event) {
    event.preventDefault();
  }

  // the following code would be used if we were to not store the favorited state
  // for each CatCard in the individual components. The problem is that the state here
  // would affect all the card components. My idea was to add each favorited card
  // to an array and just display those cards in the array but that didn't seem to work.

  // handleFavoriteButton (event) {
  //   event.preventDefault();
  //   // let favArray = this.state.favorited;
  //   // favArray.push();
  //   // this.setState({favorited: favArray});
  //   if (this.state.favorited) {
  //     this.setState({favorited: false});
  //   } else {
  //     this.setState({favorited: true});
  //   }
  // }

  render () {
    return (
      <div>
        <Header>
          <HeaderButton
            onClick={this.handleSortClick}
          >
            Sort by last word in fact.
          </HeaderButton>
          <HeaderButton
            onClick={this.handleFavClick}
          >
            Show only favorited cats.
          </HeaderButton>
          <HeaderButton
            onClick={this.handleOnlyOneClick}
          >
            Show only one at a time.
          </HeaderButton>
        </Header>
        <div className='columns'>
          <div className='column is-6 is-offset-3'>
            {this.state.cats.map((key, i) =>
              <CatCard key={i}
                image={key.image}
                fact={key.fact}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
