import React, { useState } from 'react';
import Login from './Login';
import Home from './Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userID') !== null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
