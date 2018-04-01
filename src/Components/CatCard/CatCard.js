import React, { Component } from 'react';

class CatCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      favorited: false
    };
    this.handleFavoriteButton = this.handleFavoriteButton.bind(this);
  }

  handleFavoriteButton (event) {
    event.preventDefault();
    if (this.state.favorited) {
      this.setState({favorited: false});
    } else {
      this.setState({favorited: true});
    }
  }

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
              <button
                className='button'
                onClick={this.handleFavoriteButton}
              >
                {this.state.favorited ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CatCard;
