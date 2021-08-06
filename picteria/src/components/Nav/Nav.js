import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Link,
   withRouter
 } from "react-router-dom";

class Nav extends Component {
   render() {
      let {pathname} = this.props.location
      console.log(pathname);
      let menuIcon = '';
      if(pathname === '/upload'){
         menuIcon = (
         <div class="nav__menu-icon ic-wth-txt">
         <div class="ic-wth-txt__txt">
            <Link to="/">Decline</Link>
         </div>
         <div class="ic-wth-txt__ic">
            <Link to="/">
            <svg
               width="21"
               height="22"
               viewBox="0 0 21 22"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path d="M20 1.33035L1 20.3304" stroke-width="2" />
               <path d="M1 1.66965L20 20.6696" stroke-width="2" />
            </svg>
            </Link>
         </div>
      </div>)
      }
      return (
            <div class="nav darken">
            {menuIcon}
            <div class="nav__logo logo">
                  <Link to="/" className="logo__name">picteria</Link>
               <div class="logo__dash"></div>
               <p class="logo__descr">fast photo adjustments</p>
            </div>
            </div>
      );
   }
}

export default withRouter(Nav);