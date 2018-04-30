import React, { Component } from 'react';
import update from 'immutability-helper';
import Header from './Components/Header/Header.js';
import HeaderButton from './Components/Header/HeaderButton.js';
import CatCard from './Components/CatCard/CatCard.js';
import CardButton from './Components/CatCard/CardButton.js';
import Grid from './Components/Grid/Grid.js';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cats: [],
      showingOne: false,
      showingFavs: false
    };
    this.handleAlphabetSortClick = this.handleAlphabetSortClick.bind(this);
    this.handleShowOneClick = this.handleShowOneClick.bind(this);
    this.handleShowFavClick = this.handleShowFavClick.bind(this);
    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
  }

  // once the app component mounts, call both the image API and the fact API
  componentDidMount () {
    const catImageAPI = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25';
    const catFactAPI = 'http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25';
    const catArray = [];
    const imageArray = [];
    axios.get(catImageAPI)
      .then(result => (new window.DOMParser()).parseFromString(result.data, 'text/xml'))
      .then(data => {
        // parsing XML to get link to each image
        for (let i = 0; i < 25; i++) {
          imageArray.push(
            (data.getElementsByTagName('image')[i].childNodes[1].innerHTML)
          );
        }
      }, (error) => {
        console.log('error:', error);
      })
      .then(
        axios.get(catFactAPI)
          .then(result => {
            const factArray = JSON.parse(result.data.body).data;
            // constructing each cat object to store in cat array in state
            for (let i = 0; i < factArray.length; i++) {
              let catObj = {};
              catObj['image'] = imageArray[i];
              catObj['fact'] = factArray[i].fact;
              catObj['favorited'] = false;
              catObj['display'] = 'block';
              catArray.push(catObj);
            }
            this.setState({cats: catArray});
          }, (error) => {
            console.log('error:', error);
          })
      );
  }

  // sort by last word in fact
  handleAlphabetSortClick (event) {
    event.preventDefault();
    const catArr = this.state.cats;
    // sorting by first letter of last word in fact sentence
    catArr.sort((a, b) => {
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

  // show only one cat
  handleShowOneClick (event) {
    event.preventDefault();
    let updatingState = this.state;
    const showingOne = this.state.showingOne;
    const catArray = this.state.cats;
    const catToShow = Math.floor(Math.random() * catArray.length);
    const catsToHide = catArray.filter((cat, i) => {
      return i !== catToShow;
    });
    // if all cats are showing, update the all cats except one to have display: none, update state
    if (!showingOne) {
      catsToHide.forEach((cat, i) => {
        let updatedCats = update(updatingState, {
          cats: {
            [i]: {
              $set: {
                ...this.state.cats[i], display: 'none'
              }
            }
          }
        });
        updatingState = updatedCats;
      });
      updatingState.showingOne = true;
      this.setState(updatingState);
    } else {
      // if only one cat is showing, update all cats to display: block, update state
      catArray.forEach((cat, i) => {
        let updatedCats = update(updatingState, {
          cats: {
            [i]: {
              $set: {
                ...this.state.cats[i], display: 'block'
              }
            }
          }
        });
        updatingState = updatedCats;
      });
      updatingState.showingOne = false;
      this.setState(updatingState);
    }
  }

  // show only favorited cats
  handleShowFavClick (event) {
    event.preventDefault();
    let updatingState = this.state;
    const showingFavs = this.state.showingFavs;
    const catArray = this.state.cats;
    // if showing all cats, update each cat that isn't favorited to display: none, update state
    if (!showingFavs) {
      catArray.forEach((cat, i) => {
        if (!cat.favorited) {
          let updatedCats = update(updatingState, {
            cats: {
              [i]: {
                $set: {
                  ...this.state.cats[i], display: 'none'
                }
              }
            }
          });
          updatingState = updatedCats;
        }
      });
      updatingState.showingFavs = true;
      this.setState(updatingState);
    } else {
      // if only showing favorited, update all cats to display: block, update state
      catArray.forEach((cat, i) => {
        let updatedCats = update(updatingState, {
          cats: {
            [i]: {
              $set: {
                ...this.state.cats[i], display: 'block'
              }
            }
          }
        });
        updatingState = updatedCats;
      });
      updatingState.showingFavs = false;
      this.setState(updatingState);
    }
  }

  // on the click of a specifc CatCard's favorite button
  handleFavoriteButton (event) {
    event.preventDefault();
    const catArray = this.state.cats;
    // get specific card's index in array
    const currentCat = event.target.value;
    // if favorited value at index is false, change it to true, update state
    if (!catArray[currentCat].favorited) {
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
            onClick={this.handleAlphabetSortClick}
          >
            Sort by last word in fact.
          </HeaderButton>
          <HeaderButton
            onClick={this.handleShowFavClick}
          >
            {this.state.showingFavs ? 'Show all cats.' : 'Show only favorited cats.'}
          </HeaderButton>
          <HeaderButton
            onClick={this.handleShowOneClick}
          >
            {this.state.showingOne ? 'Show all cats.' : 'Show only one cat.'}
          </HeaderButton>
        </Header>
        <Grid>
          {this.state.cats.map((key, i) =>
            <CatCard key={i}
              image={key.image}
              fact={key.fact}
              display={key.display}
            >
              <CardButton
                value={i}
                onClick={this.handleFavoriteButton}
              >
                {this.state.cats[i].favorited ? 'Unfavorite' : 'Favorite'}
              </CardButton>
            </CatCard>
          )}
        </Grid>
      </div>
    );
  }
}

export default App;
