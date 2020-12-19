import React from 'react'
import Navbar from './components/navbar'
import './App.css'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/Screens/home'
import Profile from './components/Screens/profile'
import Signin from './components/Screens/Signin'
import Signup from './components/Screens/signup'
import CreatePost from './components/Screens/CreatePost'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Route exact path='/'><Home/></Route>
        <Route path='/signin'><Signin/></Route>
        <Route path='/profile'><Profile/></Route>
        <Route path='/signup'><Signup/></Route>
        <Route path='/create'><CreatePost/></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
