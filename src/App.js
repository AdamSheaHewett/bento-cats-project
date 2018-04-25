import React, { Component } from 'react';
import update from 'immutability-helper';
import Header from './Components/Header/Header.js';
import HeaderButton from './Components/Header/HeaderButton.js';
import CatCard from './Components/CatCard/CatCard.js';
import CardButton from './Components/CatCard/CardButton.js';
// import API from './utils/API.js';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cats: [],
      showOne: false
    };
    this.handleSortClick = this.handleSortClick.bind(this);
    this.handleFavSort = this.handleFavSort.bind(this);
    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
    this.handleShowOneClick = this.handleShowOneClick.bind(this);
  }

  // once the app component mounts, call both the image API and the fact API,
  // and store their responses in state
  componentDidMount () {
    // API.callAPIs()
    //   .then(response => console.log(response));
    // .then(response => this.setState({cats: catArray}));
    var catArray = [];
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
              let catObj = {};
              catObj['image'] = imageArray[i];
              catObj['fact'] = factArray[i].fact;
              catObj['favorited'] = false;
              catArray.push(catObj);
            }
            // console.log(catArray);
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
    let catArr = this.state.cats;
    catArr.sort(function (a, b) {
      let varA = a.fact.split(' ').splice(-1)[0];
      let varB = b.fact.split(' ').splice(-1)[0];
      if (varA < varB) {
        return -1;
      }
      if (varA > varB) {
        return 1;
      }
      return 0;
    });
    this.setState({cats: catArr});
  }

  // on the click of the "Show only one at a time." button
  handleShowOneClick (event) {
    event.preventDefault();
    let showingOne = this.state.showOne;
    let catArr = this.state.cats;
    // if this.state.showOne === false, choose random cat index
    if (showingOne === false) {
      let catToShow = Math.floor(Math.random() * catArr.length) + 1;
      console.log(catToShow);
      // set all other cats to display: none
      this.setState({showOne: true});
    } else {
      // else (if only one is showing), set all cats to display: true
      this.setState({showOne: false});
    }
  }

  // on the click of the "Show only favorited cats." button, show only cats that
  // have state favorited = true.
  handleFavSort (event) {
    event.preventDefault();
    // for each cat in the cat array:
    // if this.state.cats.favorited === true, display: true
    // else, display: none
  }

  // on the click of a specifc CatCard's favorite button
  handleFavoriteButton (event) {
    event.preventDefault();
    // get array of cats
    let catArray = this.state.cats;
    // get specific card's index in array
    let currentCat = event.target.value;
    // if favorited value at index is false, go into the loop to change it to true
    if (!catArray[currentCat].favorited) {
      // change "favorited" to true for card at current index, and update state
      let updatedCats = update(this.state, {
        cats: {
          [currentCat]: {
            $set: {
              ...this.state.cats[currentCat], favorited: true
            }
          }
        }
      });
      this.setState(updatedCats);
    } else {
      // change "favorited" to false for card at current index, and update state
      let updatedCats = update(this.state, {
        cats: {
          [currentCat]: {
            $set: {
              ...this.state.cats[currentCat], favorited: false
            }
          }
        }
      });
      this.setState(updatedCats);
    }
  }

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
            onClick={this.handleFavSort}
          >
            Show only favorited cats.
          </HeaderButton>
          <HeaderButton
            onClick={this.handleShowOneClick}
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
                display={'none'}
              >
                <CardButton
                  value={i}
                  onClick={this.handleFavoriteButton}
                >
                  {this.state.cats[i].favorited ? 'Unfavorite' : 'Favorite'}
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
