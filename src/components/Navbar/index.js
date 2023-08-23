import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './index.css';

function Navbar({ t }) {
  return (
    <div className="navbar">
      <div>
        <Link className="nav-link" to="/">{t('home')}</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
      </div>
      <Link className="nav-link" to="/login">{t('login_button')}</Link>
    </div>
  );
}

export default withTranslation()(Navbar);
