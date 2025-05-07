import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Posts from './components/Posts';
import PostForm from './components/PostForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      return;
    }

    fetch('http://localhost:3000/user', {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
      .then(res => {
        if(!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => {
        setIsLoggedIn(true);
        setUser(data);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
        <Route path="/posts" element={<Posts user={user}/>} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App;
