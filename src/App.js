import './App.css';
import Login from './components/Login';
import Regiester from './components/Regiester';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //路由模組
import './i18n'; //語言模組
function App() {
  // 定義state來存儲輸入的值
  
  return (
    
    <Router>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Regiester" element={<Regiester />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
