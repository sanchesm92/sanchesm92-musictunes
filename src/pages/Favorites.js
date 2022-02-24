import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      songsFav: undefined,
      loading: false,
      attpage: false,
    };
    this.requestFavSongs = this.requestFavSongs.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.atualizaPage = this.atualizaPage.bind(this);
  }

  // retirado a ideia do this.mounted da thread do Gilson Alencar T16B, ele postou uma thread de dica referente ao assunto
  componentDidMount() {
    this.requestFavSongs();
    this.mounted = true;
  }

  componentDidUpdate() {
    const { attpage } = this.state;
    if (attpage) {
      this.atualizaPage();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  atualizaPage() {
    this.setState({ attpage: false });
  }

  async requestFavSongs() {
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ loading: false, songsFav: favSongs });
  }

  deleteSong({ target }) {
    const id = target.name;
    const { songsFav } = this.state;
    const obj = songsFav.find((song) => song.trackId === Number(id));
    const indexObj = songsFav.indexOf(obj, 0);
    songsFav.splice(indexObj, 1);
    localStorage.setItem('favorite_songs', JSON.stringify(songsFav));
    this.setState({ songsFav, attpage: true });
  }

  render() {
    const { loading, songsFav, attpage } = this.state;
    if (loading || attpage) return <Carregando />;
    if (attpage) return <p>Atualiza</p>;
    return (
      <div data-testid="page-favorites">
        {songsFav && <Header />}
        <p>Favorites</p>
        {songsFav && songsFav.map((song, index) => (
          <div key={ index }>
            <p>{song.trackName}</p>
            <audio data-testid="audio-component" src={ song.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="inputFav">
              Favorita
              <input
                type="checkbox"
                checked
                id="inputFav"
                data-testid={ `checkbox-music-${song.trackId}` }
                onChange={ this.deleteSong }
                name={ song.trackId }
              />
            </label>
          </div>))}
      </div>
    );
  }
}

export default Favorites;
