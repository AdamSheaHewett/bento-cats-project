import React, { Component } from 'react';
import update from 'immutability-helper';
import Header from './Components/Header/Header.js';
import HeaderButton from './Components/Header/HeaderButton.js';
import CatCard from './Components/CatCard/CatCard.js';
import CardButton from './Components/CatCard/CardButton.js';
import Grid from './Components/Grid/Grid.js';
// import API from './utils/API.js';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cats: [],
      showingOne: false,
      showingFavs: false
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
              catObj['display'] = 'block';
              catArray.push(catObj);
            }
            // console.log(catArray);
            this.setState({cats: catArray});
          }, (error) => {
            console.log('error:', error);
          })
      );
  }

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
    let showingOne = this.state.showingOne;
    let catArray = this.state.cats;
    let updatingState = this.state;
    const catToShow = Math.floor(Math.random() * catArray.length);
    let catsToHide = catArray.filter((cat, i) => {
      return i !== catToShow;
    });
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

  handleFavSort (event) {
    event.preventDefault();
    let showingFavs = this.state.showingFavs;
    let catArray = this.state.cats;
    let updatingState = this.state;
    if (!showingFavs) {
      // for each cat in the cat array:
      catArray.forEach((cat, i) => {
        // if the cat isn't favorited, display: none
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
      // set up grid, then populate with map?
      // should probably have grid component then fill with cards
      // instead of one column, or columns here. should be component.
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
