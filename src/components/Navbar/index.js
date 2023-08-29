import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import React, { useState ,useEffect} from 'react';
import './index.css';
import { useCookies } from 'react-cookie';


function Navbar({ t, i18n }) {
  const [cookies] = useCookies(['username', 'session']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const language_list =  [
    { id: 'en', name: 'English' },
    { id: 'zh-tw', name: 'Taiwan' },
    { id: 'vi-vn', name: 'Vietnam' }
  ];
  const [isLogged, setIsLogged] = useState(false);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  //更改語言
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setDropdownOpen(false); // Close the dropdown after selecting a language
  };

  const getImageSource = (languageId) => {
  // 如果沒有圖片就變成預設圖片
    try {
      return require(`../image/language_flag/${languageId}.png`);
    } catch (error) {
      return require(`../image/language_flag/vi-vn.png`);
    }
  };

  useEffect(() => {
    const sessionCookie = document.cookie.split(';').some((item) => item.trim().startsWith('session='));

    if (sessionCookie) {
      setIsLogged(true);
    }
  }, []);

  //登出清除 cookie
  const logout = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setIsLogged(false); // update the state after log out
  };

  return (
    <div className="navbar">
      <div>
        <Link className="nav-link" to="/">{t('home')}</Link>
        <Link className="nav-link" to="/contact">{t('contact')}</Link>
      </div>
      <div className="nav-link">
      <div onClick={toggleDropdown}>{t('language')}</div>
        {dropdownOpen && (
          <div className="language-dropdown">
            {
            language_list.map(language_list=>(
              <div className='language-container'>

                <img  src={ getImageSource(language_list.id) }  
                      style={{width:"15px",height:"10px"}} 
                      alt={`${language_list.name} icon`}/>

                <div onClick={() => changeLanguage(language_list.id)}>
                  {t(language_list.id)}
                  </div>

              </div>
            ))
            }

          </div>
        )}
        </div>
      <div className="nav-link">
      {cookies.session ? <span onClick={logout} >{cookies.username}</span> : <Link className="nav-link" to="/login">{t('login_button')}</Link>}
      </div>
      
    </div>
  );
}


export default withTranslation()(Navbar);
