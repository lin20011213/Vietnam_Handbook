import React, { useState ,useEffect} from 'react';
import { withTranslation } from 'react-i18next';
import './index.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({t}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie.split(';').some((item) => item.trim().startsWith('session='));
    if (cookie) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // 清空錯誤訊息

    try {
      const response = await axios.post('http://localhost:5000/Login', {
        username,
        password
      }, {
        withCredentials: true,
      });
      const cookie = document.cookie.split(';').some((item) => item.trim().startsWith('session='));
      if (cookie) {
        
        navigate('/'); // 跳轉到主頁
      } else {
        setError('帳號或密碼錯誤'); // 設定錯誤訊息
      }

    } catch (error) {
      console.error('Error:', error);
      navigate('/');
      setError('無法連接到伺服器'); // 設定錯誤訊息
    }
  };


return (
  <div className="outside">
    <div className="image-container">
      <img src={require('./people.png')} alt="Background" loading="lazy"/>
    </div>
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="login-form-input"
          placeholder={t('account_word')}
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          className="login-form-input"
          placeholder={t('password_word')}
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button className="btn login-form-button" type="submit">{t('login_button')}</button>
        <p/>
        <Link className="btn login-form-register" to="/Register">{t('register')}</Link>
      </form>
      {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}
    </div>
  </div>
);
};

export default withTranslation()(Login);
