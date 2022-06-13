import React, { createContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Account from './components/Account/Account';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Desc from './components/Events/Desc';
import Events from './components/Events/Events';
import Home from './components/Home';

export const AppContext = createContext(null);

function App() {

  const myStorage = window.sessionStorage;
  const currUser = myStorage.getItem("user");

  return (
    <AppContext.Provider value={{currUser, myStorage}}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/events-data/:id' element={<Desc/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
