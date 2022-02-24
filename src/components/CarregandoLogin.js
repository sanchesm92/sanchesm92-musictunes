import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './CarregandoLogin.css';

class CarregandoLogin extends Component {
  constructor() {
    super();
    this.state = {
      storage: false,
      loading: false,
    };
    this.verifyLocal = this.verifyLocal.bind(this);
  }

  componentDidMount() {
    this.verifyLocal();
  }

  verifyLocal() {
    this.setState({ loading: true });
    const local = localStorage.getItem('user');
    if (local) {
      this.setState({ storage: true, loading: false });
    }
  }

  render() {
    const { storage, loading } = this.state;
    if (loading) return (
      <div className='loadingContainer'>
        <h1 className='loading'>Loading...</h1>
      </div>
    );
    return (
      <div>
        { storage && <Redirect to="/search" /> }

      </div>
    );
  }
}

export default CarregandoLogin;
