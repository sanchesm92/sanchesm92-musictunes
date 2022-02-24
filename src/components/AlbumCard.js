import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { data: { artistId, artistName,
      collectionId, collectionName, collectionPrice,
      artworkUrl100, releaseDate, trackCount } } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ { pathname: `/album/${collectionId}`,
            state: { name: artistName, album: collectionName } } }
        >
          More Details
        </Link>
        <p>{artistId}</p>
        <p>{artistName}</p>
        <p>{collectionId}</p>
        <p>{collectionName}</p>
        <p>{collectionPrice}</p>
        <img src={ artworkUrl100 } alt={ artistName } />
        <p>{releaseDate}</p>
        <p>{trackCount}</p>
      </div>

    );
  }
}

AlbumCard.propTypes = {
  data: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default AlbumCard;
