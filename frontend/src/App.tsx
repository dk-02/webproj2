import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'></Route>
        <Route path='/login'></Route>
        <Route path='/register'></Route>
        <Route path='/home'></Route>
        <Route path='/profile'></Route>
      </Routes>
    </Router>
  );
}

export default App;
