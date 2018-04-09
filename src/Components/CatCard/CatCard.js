import React, { Component } from 'react';

class CatCard extends Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     favorited: false
  //   };
  //   this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
  // }

  // changing the state within the Card component allows for individual
  // cards to be favorited as opposed to all cards being changed
  // by keeping Card state in the App component

  // handleFavoriteButton (event) {
  // this line could be used if we were controlling Card state from the App component:
  // this.props.handleFavoriteButton(event);
  //   event.preventDefault();
  //   if (this.state.favorited) {
  //     this.setState({favorited: false});
  //   } else {
  //     this.setState({favorited: true});
  //   }
  // }

  render () {
    return (
      <div className='card'>
        <div className='card-image'>
          <figure className='image'>
            <img src={this.props.image} alt='cat' />
          </figure>
        </div>
        <div className='card-content'>
          <div className='content columns is-vcentered is-mobile'>
            <div className='column is-9'>
              <p className=''>
                {this.props.fact}
              </p>
            </div>
            <div className='column is-2 is-offset-1'>
              {this.props}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CatCard;
