import React, { Component } from 'react';
class Home extends Component {
  render() {
    return (
        <>
      <header id="home">
      <div className="row banner">
         <div className="banner-text">
             <br/>
            <h1 className="responsive-headline">Having trouble in keeping track of your expenses?</h1>
            <h3>Don't wory we have got you covered!!</h3>
            <hr />
            <ul className="social">
               <a href="http://localhost:3000/signupform?firstName=&lastName=&email=&password=" className="button btn project-btn"><i className="fa fa-book"></i>Sign Up</a>
            </ul>
         </div>
      </div>  
   </header >
   </>
    );
  }
}

export default Home;