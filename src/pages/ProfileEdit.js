import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisable: true,
      inputName: '',
      inputEmail: '',
      inputDescription: '',
      inputImage: '',
      redirect: false,
    };
    this.verifyButtonEnable = this.verifyButtonEnable.bind(this);
    this.getLocalUser = this.getLocalUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveButton = this.saveButton.bind(this);
  }

  componentDidMount() {
    const { redirect } = this.state;
    if (!redirect) this.getLocalUser();
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange({ target }) {
    this.setState(({ [target.name]: target.value }), this.verifyButtonEnable);
  }

  async getLocalUser() {
    const data = await getUser();
    const { name, email, image, description } = data;
    this.setState({
      inputName: name,
      inputEmail: email,
      inputImage: image,
      inputDescription: description,
      buttonDisable: false,
    });
  }

  verifyButtonEnable() {
    const { inputName, inputEmail, inputDescription, inputImage } = this.state;
    const emailValidate = (inputEmail.includes('@') && inputEmail.endsWith('.com'))
      ? inputEmail : undefined;
    const arr = [inputName, emailValidate, inputDescription, inputImage];
    if (!arr.some((item) => item === undefined)
    && (arr.every((item) => item.length > 0))) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  async saveButton() {
    this.setState({ redirect: true });
    const { inputName, inputEmail, inputDescription, inputImage } = this.state;
    await updateUser({
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputDescription,
    });
  }

  render() {
    const { buttonDisable, redirect, inputName, inputEmail,
      inputDescription, inputImage } = this.state;
    return (
      <div className='profileEditAllContainer' data-testid="page-profile-edit">
        <Header />
        <section className='profileContainer'>
        <div className='borderProfile'>
          <h1 className='h1ProfileEdit'>Edit Profile</h1>
          {redirect ? <Redirect to="/profile" /> : (
            <div className='labelsContainer'>
              <label htmlFor="edit-input-name">
                <input
                  placeholder='Name'
                  type="text"
                  name="inputName"
                  value={ inputName }
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-email">
                <input
                  placeholder='Email'
                  type="email"
                  name="inputEmail"
                  value={ inputEmail }
                  data-testid="edit-input-email"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="edit-input-description">
                <input
                  placeholder='Description'
                  type="text"
                  name="inputDescription"
                  value={ inputDescription }
                  data-testid="edit-input-description"
                  onChange={ this.handleChange }
                  />
              </label>
              <label htmlFor="edit-input-image">
                <input
                placeholder='Url Image'
                type="text"
                name="inputImage"
                value={ inputImage }
                data-testid="edit-input-image"
                onChange={ this.handleChange }
                />
              </label>
              <button
                className='btnEdit'
                disabled={ buttonDisable }
                type="submit"
                data-testid="edit-button-save"
                onClick={ this.saveButton }
              >
                Save
              </button>
            </div>
          )}
        </div>
          </section>
      </div>
    );
  }
}

export default ProfileEdit;
