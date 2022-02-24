import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: null,
      loading: true,
    };
    this.searchMusics = this.searchMusics.bind(this);
    this.requestFavSongs = this.requestFavSongs.bind(this);
  }

  componentDidMount() {
    this.searchMusics();
    this.requestFavSongs();
  }

  async requestFavSongs() {
    this.setState({ loading: true });
    await getFavoriteSongs();
    this.setState({ loading: false });
  }

  async searchMusics() {
    const { match: { params: { id } } } = this.props;
    const answer = await getMusics(id);
    this.setState({ musics: answer, loading: false });
  }

  render() {
    const { musics, loading } = this.state;
    if (!loading) {
      const { artistName, collectionName } = musics[0];
      return (
        <div data-testid="page-album">
          <Header />
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{`${artistName}: ${collectionName}`}</p>
          {musics && musics.slice(1)// Idéia de usar o slice retirada da thread do slack feita pelo Leomar da turma 14
            .map((song, indice) => (
              <div key={ indice }>
                <MusicCard music={ song } allSongs={ musics } />
              </div>))}
        </div>
      );
    }
    return <Carregando />;
  }
}

// Referencia 1: https://stackoverflow.com/questions/47519612/eslint-match-is-missing-in-props-validation-react-prop-types
// Referencia 2: https://stackoverflow.com/questions/52531836/failed-prop-type-invalid-prop-match-params-of-type-object-supplied-to-page
Album.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
