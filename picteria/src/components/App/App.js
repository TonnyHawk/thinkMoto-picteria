import React, { Component } from 'react';
import Card from '../Card/Card';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import {
   BrowserRouter as Router,
   Switch,
   Route,
 } from "react-router-dom";

class App extends Component {
   render() {
      return (
            <Router>
            <div id="bg">
                  <div class="container">
                     <Nav></Nav>
                  </div>
                  <Switch>
                     <Route exact path="/">
                        <div class="container">
                           <Header />
                        </div>
                     </Route>
                     <Route exact path="/upload">
                        <Card />
                     </Route>
                  </Switch>
                  </div>
            </Router>
      );
   }
}

export default App;