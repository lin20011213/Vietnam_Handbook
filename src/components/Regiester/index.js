import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import './index.css';


const Regiester = ({ t }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User registered with data:', formData);
  };

  return (
    <div className="outside">
      <div className="sub-title">{t('register')}</div>
      <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label className='left-text'>{t('account_word')}:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('password_word')}: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{t('register')}</button>
      </form>
      </div>
    </div>
  );
};

export default withTranslation()(Regiester);
