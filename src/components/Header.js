import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
    this.updateUserState = this.updateUserState.bind(this);
  }

  componentDidMount() {
    this.updateUserState();
  }

  async updateUserState() {
    const { name } = await getUser();
    this.setState({ user: name });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        {user === '' ? <Carregando />
          : (
            <div className='headerContainer'>
              <Link className='headerLinks headerUserName' data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              <Link className='headerLinks headerUserName' data-testid="link-to-search" to="/search">Search</Link>
              <Link className='headerLinks headerUserName' data-testid="link-to-profile" to="/profile">Profile</Link>
              <h1 className='headerUserName headerUserName' data-testid="header-user-name">{user}</h1>
            </div>)}
      </header>
    );
  }
}

export default Header;
