import React, { Component } from 'react';

class CatCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      favorited: true
    };
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
          <div className='content columns is-vcentered'>
            <div className='column is-9'>
              <p className=''>
                {this.props.fact}
              </p>
            </div>
            <div className='column is-2 is-offset-1'>
              <button
                className='button'
                style={{ background: this.state.favorited ? 'blue' : 'red' }}
              >
                Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CatCard;
