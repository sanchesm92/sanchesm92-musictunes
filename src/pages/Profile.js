import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
    };
    this.getLocalUser = this.getLocalUser.bind(this);
  }

  componentDidMount() {
    this.getLocalUser();
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async getLocalUser() {
    const data = await getUser();
    this.setState({ user: data });
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className='profileContainer'>
        <p>Profile</p>
        {user && (
          <div className='profileEditContainer'>
            <Link className='linkProfile' to="/profile/edit">Edit Profile</Link>
            <h4>
              {user.name}
            </h4>
            <h4>
              {user.email}
            </h4>
            <h4>
              {user.description}
            </h4>
            <img
              src={ user.image }
              alt={ `nome: ${user.name}` }
              data-testid="profile-image"
              />
          </div>)}
        </div>
      </div>);
  }
}

export default Profile;
