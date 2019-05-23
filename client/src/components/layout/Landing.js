import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return(
      <div style={{ margin:'100px 0 10px 0', textAlign:'center' }}>
        Audio Library Catalog
        <img src={ 
          require('./ALC-Logo-1.png')} 
          alt="audio library catalog logo" 
          style={{ 
            display:'inline-block', 
            margin:'auto',
            width:'100%'
          }} />
      </div>
    )
  }
}

export default Landing;