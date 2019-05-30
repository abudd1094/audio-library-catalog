import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return(
      <div style={{ margin:'100px 0 0 0', textAlign:'center' }}>
        <h2>Audio Library Catalog</h2>
        <img src={ 
          require('./ALC-Logo-1.png')} 
          alt="audio library catalog logo" 
          style={{ 
            display:'inline-block', 
            margin:'auto',
            width:'50%'
          }} />
      </div>
    )
  }
}

export default Landing;