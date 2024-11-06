import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
      const checkAuth = async () => {
          try {
              const response = await fetch("http://localhost:5000/auth/check", {
                  method: "GET",
                  // credentials: "include",
                  headers: {
                    "Authorization" : `Bearer ` + localStorage.getItem("accessToken")
                  }
              });
              const data = await response.json();
              setIsAuthenticated(data.status);
          } catch (error) {
              setIsAuthenticated(false);
              console.error("Error checking authentication:", error);
          }
      };

      checkAuth();
  }, []);


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
