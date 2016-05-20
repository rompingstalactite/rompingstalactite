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
  background: 'linear-gradient(rgba(50, 30, 45, 0.5), rgba(3, 79, 145, 0.5)), url(' + images[randImage] +')',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  paddingTop: '100px',
};

const Landing = () => (
  <div className="landing">
    <div className="hero" style={heroImageStyle}>
      <div className="hero-content grid grid-pad">
        <div className="hero-content-logo col-1-3">
          <img style={{display: 'block', margin: '14px auto', maxWidth: '300px'}} className="landing-content-image" src="../assets/forkful-large.svg"></img>
        </div>
        <div style={{marginTop: '48px'}} className="hero-content-text">
          <h1 style={{color: 'white', marginBottom: '0px'}} className="hero-tagline col-2-3">Cook. Iterate. Repeat.</h1>
          <h3 style={{color: 'white', marginTop: '8px', fontWeight: 'lighter'}} className="hero-tagline col-2-3">Forkful helps you perfect your next meal by tracking different iterations of recipes.</h3>
        </div>
        <div style={{margin: '40px 10px', textAlign: 'center'}} className="hero-content-signin col-1-1">
          <a href="/auth/google" style={{color: 'white'}}>
            {/*<img style={{display: 'block', margin: 'auto'}} className="google-signin" src="../assets/btn_google_signin_light_normal_web@2x.png"/>*/}
            <div id="google-signin"/>
          </a>
          <a href="/dashboard">
            <h4 id="link-continue" style={{textAlign: 'center'}}>or, continue without signing in</h4>
          </a>
        </div>
      </div>
    </div>
    <div className="grid grid-pad landing-content">
      <div style={{marginBottom: '48px'}} className="col-1-3 landing-content-blurb">
        <h3 style={{textAlign: 'center'}} className="landing-content-title">Fork Recipes</h3>
        <p style={{height: '32px', textAlign: 'center', marginBottom: '16px', color: '#687F72'}} className="landing-content-text">"Fork" a recipe to modify it and make it your own.</p>
        <img style={{width: '150px', display: 'block', margin: 'auto'}} className="landing-content-image" src="../assets/fork.png"></img>
      </div>
      <div style={{marginBottom: '48px'}} className="col-1-3 landing-content-blurb">
        <h3 style={{textAlign: 'center'}} className="landing-content-title">Recipe History</h3>
        <p style={{height: '32px', textAlign: 'center', marginBottom: '16px', color: '#687F72'}} className="landing-content-text">See how recipes have changed over time.</p>
        <img style={{width: '150px', display: 'block', margin: 'auto'}} className="landing-content-image" src="../assets/history.png"></img>
      </div>
      <div style={{marginBottom: '48px'}} className="col-1-3 landing-content-blurb">
        <h3 style={{textAlign: 'center'}} className="landing-content-title">Explore</h3>
        <p style={{height: '32px', textAlign: 'center', marginBottom: '16px', color: '#687F72'}} className="landing-content-text">Browse our most popular recipes and get cooking!</p>
        <img style={{width: '150px', display: 'block', margin: 'auto'}} className="landing-content-image" src="../assets/explore.png"></img>
      </div>
    </div>
    <div className="footer">
      <p style={{textAlign: 'center', color: '#687F72', size: '8px'}}>Made by <a href="https://github.com/andrewh0">Andrew</a>, <a href="https://github.com/controtie">Dylan</a>, <a href="https://github.com/nemobaker">Nemo</a>, and <a href="https://github.com/thomasingalls">Thomas</a>.
        <br/>Recipes powered by <a href="http://www.yummly.com">Yummly</a>. Icons from <a href="http://www.thenounproject.com">The Noun Project</a>.
      </p>
    </div>
  </div>
);

export default Landing;
