import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import { jwtDecode } from "jwt-decode";
import Users from './pages/Users';

interface User {
  id: string;
  username: string;
}

function App() {

  const getUserFromToken = (): User | null => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const decoded = jwtDecode<User>(token);
        return decoded;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile userId={getUserFromToken()?.id || "user"} />} />
        </Route>
        <Route path='/users' element={<Users/>}/>
      </Routes>
    </Router>
  );
}

export default App;
