import React, { Component } from 'react';
import Card from '../Card/Card';
import Header from '../Header/Header';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
 } from "react-router-dom";

class App extends Component {
   render() {
      return (
         <Router>
         <div id="bg">
         <div class="viewport">

           <div class="container">
            <Switch>
               <Route exact path="/">

               <div class="nav darken">
              <div class="nav__logo logo">
                <p class="logo__name"><Link to="/">picteria</Link></p>
                <div class="logo__dash"></div>
                <p class="logo__descr">fast photo adjustments</p>
              </div>
            </div>
                  <Header/>
               </Route>
               <Route exact path="/upload">
               <div class="nav darken">
               <div class="nav__menu-icon ic-wth-txt">
                <div class="ic-wth-txt__txt"> <Link to="/">Decline</Link> </div>
                <div class="ic-wth-txt__ic">
                <Link to="/">
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 1.33035L1 20.3304" stroke-width="2" />
                    <path d="M1 1.66965L20 20.6696" stroke-width="2" />
                  </svg>
                  </Link>
                </div>
              </div>
              <div class="nav__logo logo">
                <p class="logo__name"><Link to="/">picteria</Link></p>
                <div class="logo__dash"></div>
                <p class="logo__descr">fast photo adjustments</p>
              </div>
            </div>
                  <Card/>
               </Route>
            </Switch>
          </div>
          </div>
          </div>
          </Router>
      );
   }
}

export default App;