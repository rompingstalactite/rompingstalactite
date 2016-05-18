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
  backgroundImage: 'url(' + images[randImage] +')',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: '500px',
};

const Landing = () => (
  <div className="landing">
    <div className="hero" style={heroImageStyle}>
      <h1 style={{color: 'white', textAlign: 'center'}}>[LOGO]</h1>
      <a href="/auth/google" style={{color: 'white', textAlign: 'center'}}>
        <img className="google-signin" src="../assets/btn_google_signin_light_normal_web@2x.png" />
      </a>
      <a href="/dashboard">
        <h3 style={{color: 'white', textAlign: 'center'}}>Continue without signing in</h3>
      </a>
    </div>
    <div className="landing-content">
      <div className="landing-content-blurb">
        <img className="landing-content-image" src="http://placehold.it/200x200"></img>
        <p className="landing-content-text">Sriracha fixie heirloom slow-carb XOXO chartreuse locavore, mixtape cornhole whatever vice fashion axe. Semiotics biodiesel beard pinterest fap, post-ironic chambray austin lo-fi taxidermy brunch pabst hella etsy green juice. Migas pitchfork plaid gastropub keffiyeh, celiac taxidermy kitsch. Williamsburg letterpress kickstarter single-origin coffee marfa. Cray seitan blue bottle, franzen deep v poutine cronut narwhal polaroid irony hashtag flexitarian wolf gochujang. Chicharrones +1 dreamcatcher, disrupt blog man braid PBR&B godard locavore four loko single-origin coffee yuccie. Jean shorts raw denim plaid drinking vinegar, hammock venmo synth.</p>
      </div>
      <div className="landing-content-blurb">
        <p className="landing-content-text">Whatever direct trade synth kinfolk. Plaid wolf truffaut, vice sartorial knausgaard chillwave YOLO lomo kombucha fixie. Blue bottle PBR&B hoodie aesthetic williamsburg austin. Pour-over shabby chic vinyl retro normcore green juice listicle stumptown, pickled pitchfork bitters blue bottle deep v keffiyeh schlitz. Meh lo-fi literally chicharrones, ugh kitsch gluten-free kale chips migas gentrify asymmetrical listicle lomo knausgaard. Hoodie butcher selfies selvage, hashtag taxidermy meggings polaroid schlitz beard kitsch fixie put a bird on it. Yuccie four loko plaid, knausgaard letterpress austin semiotics listicle narwhal lumbersexual cardigan franzen heirloom.</p>
        <img className="landing-content-image" src="http://placehold.it/200x200"></img>

      </div>
      <div className="landing-content-blurb">
        <p className="landing-content-text">Lumbersexual polaroid put a bird on it, portland cornhole church-key celiac. Cray photo booth vinyl, fanny pack master cleanse affogato messenger bag viral mustache fashion axe migas. Man braid 3 wolf moon kombucha, tacos pickled butcher YOLO jean shorts pinterest salvia kinfolk meditation +1 microdosing. Franzen ethical ramps neutra, meggings tousled chillwave affogato vice humblebrag poutine. Bushwick meh green juice kitsch hammock small batch. +1 fixie stumptown, kinfolk chicharrones four loko gochujang actually knausgaard tilde. Selfies heirloom pinterest iPhone before they sold out.</p>
        <img className="landing-content-image" src="http://placehold.it/200x200"></img>
      </div>
    </div>
  </div>
);

export default Landing;
