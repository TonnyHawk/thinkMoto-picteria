import React, { Component } from 'react';
import {
   Link
 } from "react-router-dom";

class Header extends Component {
   render() {
      return (
         <header class="header">
         <div class="header__offer">
           <h1 class="header__title">adjust any photo in a minutes</h1>
           <p class="header__descr">Add a great filters to your photo without any complex operations, just upload and see how it works!</p>
           <button class="header__action action-btn"><Link to="/upload">Upload a photo</Link></button>
         </div>
         <div class="header__aside">
           <div class="header__collection collection">
             <div class="collection__photo ibg">
               <img src="img/collection/big/2.jpg" alt="" />
             </div>
             <div class="collection__photo ibg">
               <img src="img/collection/big/1.jpg" alt="" />
             </div>
             <div class="collection__photo ibg">
               <img src="img/collection/big/1.jpg" alt="" />
             </div>
           </div>
         </div>
       </header>
      );
   }
}

export default Header;