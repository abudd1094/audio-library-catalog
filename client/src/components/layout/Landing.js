import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return(
      <div className="landing">
        <h2>Audio Library Catalog</h2>
        <img src={ 
          require('./ALC-Logo-1.png')} 
          alt="audio library catalog logo" 
          style={{ 
            display:'inline-block', 
            margin:'auto',
            width:'50%',
            maxWidth:'200px'
          }} />
      </div>
    )
  }
}

export default Landing;