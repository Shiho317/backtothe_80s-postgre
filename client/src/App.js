import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Desc from './components/Events/Desc';
import Events from './components/Events/Events';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/events-data/:id' element={<Desc/>}/>
      </Routes>
    </Router>
  );
}

export default App;
