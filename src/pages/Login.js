import React, { Component } from 'react';
import CarregandoLogin from '../components/CarregandoLogin';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      buttonDisable: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyLocalStorage = this.verifyLocalStorage.bind(this);
  }

  handleChange({ target }) {
    this.setState(({ inputText: target.value }), this.changeButton);
  }

  handleClick() {
    const { inputText } = this.state;
    const user = ({ name: inputText });
    this.setState(({ redirect: true }));
    createUser(user);
  }

  changeButton() {
    const { inputText } = this.state;
    const minTextLength = 3;
    let answer = true;
    if (inputText.length >= minTextLength) {
      answer = false;
    }
    this.setState(({ buttonDisable: answer }));
  }

  verifyLocalStorage() {
    const local = localStorage.getItem('user');
    if (local) {
      this.setState({ redirect: true });
    }
  }

  render() {
    const { buttonDisable, inputText, redirect } = this.state;
    return (
      <div data-testid="page-login" className='background-login'>
        {redirect ? <CarregandoLogin />
          : (
            <div className='loginContainer'>
              <h1>MyTunes</h1>
              <div className='inputContainer'>
                <label htmlFor="login-name-input">
                  <input
                    type="text"
                    data-testid="login-name-input"
                    placeholder="Name"
                    value={ inputText }
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  className='btn-grad '
                  disabled={ buttonDisable }
                  type="submit"
                  data-testid="login-submit-button"
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Login;
