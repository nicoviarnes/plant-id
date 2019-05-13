import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage';
import IDpage from "./Components/IDpage/index";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SimpleModalWrapped from './Components/LoginModal/LoginModal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={SimpleModalWrapped}/>
          <Route path="/ID" component={IDpage}/>
        </Switch>
      </BrowserRouter>
      <SimpleModalWrapped></SimpleModalWrapped>
    </div>
  );
}

export default App;
