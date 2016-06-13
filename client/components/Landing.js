import React from 'react';

import '../scss/_landing.scss';

const images = [
  'http://i.imgur.com/0uBzRJu.jpg', // chefs
  'http://i.imgur.com/KaHBbNU.jpg', // tomatoes
  'http://i.imgur.com/gBywUYs.jpg', // sandwich
  'http://i.imgur.com/3tPEYS9.jpg', // cookbook
  'http://i.imgur.com/U7yz4jB.jpg', // onion
  'http://i.imgur.com/P7HV4tq.jpg',
  'http://i.imgur.com/U7yPCPx.jpg',
  'http://i.imgur.com/MdsjkBd.jpg',
  'http://i.imgur.com/c8zNaLo.jpg',
  'http://i.imgur.com/YdLYJXS.jpg',
];

let randImage = Math.floor(Math.random() * images.length);
let heroImageStyle = {
  background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(' + images[randImage] +')',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  marginBottom: 0,
  // paddingTop: '100px',
};

const Landing = () => (
  <div className="landing">
    <div className="jumbotron" style={heroImageStyle}>
      <div className="container">
        <div className="hero-content-logo">
          <img
            style={{display: 'block', margin: '14px auto', maxWidth: '150px'}}
            src="../assets/forkful-large.svg">
          </img>
        </div>
        <h1 style={{color: 'white', marginBottom: '0px'}} className="hero-tagline text-center">Cook. Modify. Repeat.</h1>
        <p style={{color: 'white'}} className="hero-tagline text-center">Forkful helps you perfect your next meal by tracking different iterations of recipes.</p>
        <div style={{margin: '20px 10px'}} className="hero-content-signin text-center">
          <a href="/auth/google" style={{color: 'white'}}>
            <div id="g-signin"/>
          </a>
          <a href="/dashboard" id="link-continue">
            <h6>or, continue without signing in</h6>
          </a>
        </div>
      </div>
    </div>
    <div className="container-fluid" style={{backgroundColor: 'white', paddingTop: '30px', paddingBottom: '30px'}}>
      <div className="row">
        <div className="col-md-4">
          <h3 className="landing-content-title text-center">Fork Recipes</h3>
          <p className="landing-content-text text-center text-muted">"Fork" a recipe to modify it and make it your own.</p>
          <img className="landing-content-image" src="../assets/fork.png"></img>
        </div>
        <div className="col-md-4">
          <h3 className="landing-content-title text-center">Recipe History</h3>
          <p className="landing-content-text text-center text-muted">See how recipes have changed over time.</p>
          <img className="landing-content-image" src="../assets/history.png"></img>
        </div>
        <div className="col-md-4">
          <h3 className="landing-content-title text-center">Explore</h3>
          <p className="landing-content-text text-center text-muted">Browse our most popular recipes and get cooking!</p>
          <img className="landing-content-image" src="../assets/explore.png"></img>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
