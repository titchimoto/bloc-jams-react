import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <section className="landing">
      <div id="featured-image">
        <h1 className="featured-title">TURN THE MUSIC UP!</h1>
        </div>

        <section className="selling-points">
        <div className="point-column">
        <span className="ion-headphone"></span>
        <h3 className="point-title">Choose your music</h3>
        <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
        <div className="point-column">
        <span className="ion-wifi"></span>
       <h3 className="point-title">Unlimited, streaming, ad-free</h3>
       <p className="point-description">No arbitrary limits. No distractions.</p>
     </div>
     <div className="point-column">
     <span className="ion-iphone"></span>
       <h3 className="point-title">Mobile enabled</h3>
       <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
     </div>
   </section>
      </section>
    );
  }
}

export default Landing;
