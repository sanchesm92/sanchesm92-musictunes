import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import './Album.css';

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
        <div className={musics[3] ? 'albumImgContainer' : 'albumImgContainer2' } data-testid="page-album">
          <Header />
          <div className='txtAlbum'>
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{`${artistName}: ${collectionName}`}</p>
          </div>
          {musics && musics.slice(1)// Idéia de usar o slice retirada da thread do slack feita pelo Leomar da turma 14
            .map((song, indice) => (
              <div className='songsContainer' key={ indice }>
                <MusicCard music={ song } allSongs={ musics } />
              </div>))}
        </div>
      );
    }
    return <Carregando />;
  }
}

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
