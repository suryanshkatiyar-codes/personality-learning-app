import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Quiz from './pages/Quiz';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/roadmap/:id' element={<Roadmap/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
