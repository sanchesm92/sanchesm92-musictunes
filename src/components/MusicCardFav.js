import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
      removed: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLocalStorage = this.verifyLocalStorage.bind(this);
  }

  componentDidMount() {
    this.verifyLocalStorage();
  }

  shouldComponentUpdate() {
    return false;
  }

  async handleChange({ target }) {
    this.setState({ loading: true });
    const { allSongs, changeAttPage } = this.props;
    const { check } = this.state;
    const objFavSong = allSongs
      .slice(1).find((sound) => sound.trackId === Number(target.name));
    if (!check) {
      await addSong(objFavSong);
      this.setState({ loading: false, check: true });
    } else {
      await removeSong(objFavSong);
      this.setState(({ removed: true, loading: false, check: false }), changeAttPage());
    }
  }

  verifyLocalStorage() {
    const { music: { trackId } } = this.props;
    const local = JSON.parse(localStorage.getItem('favorite_songs'));
    const checkLocal = local.some((music) => music.trackId === trackId);
    if (checkLocal) {
      this.setState({ check: true });
    }
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, check, removed } = this.state;
    if (loading) return <Carregando />;
    return (
      <div>
        {!removed && (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="inputFav">
              Favorita
              <input
                type="checkbox"
                checked={ check }
                id="inputFav"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                name={ trackId }
              />
            </label>
          </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  allSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeAttPage: PropTypes.func.isRequired,
};

export default MusicCard;
