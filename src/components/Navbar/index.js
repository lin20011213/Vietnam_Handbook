import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import React, { useState } from 'react';
import './index.css';

function Navbar({ t, i18n }) {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setDropdownOpen(false); // Close the dropdown after selecting a language
  };


  return (
    <div className="navbar">
      <div>
        <Link className="nav-link" to="/">{t('home')}</Link>
        <Link className="nav-link" to="/contact">{t('contact')}</Link>
      </div>
      <Link className="nav-link" to="/login">{t('login_button')}</Link>
      
      <div className="nav-link">
        <button onClick={toggleDropdown}>Language</button>
        {dropdownOpen && (
          <div className="language-dropdown">
            <li>
            <button onClick={() => changeLanguage('en')}>EN</button>
            </li>
            <li>
            <button onClick={() => changeLanguage('zh-tw')}>ZH</button>
            </li>
            <li>
            <button onClick={() => changeLanguage('vi-vn')}>vi</button>
            </li>
          </div>
        )}
      </div>
    </div>
  );
}


export default withTranslation()(Navbar);
