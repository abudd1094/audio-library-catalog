import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// Load Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />
          <Route exact path="/" component={Landing} />
        </div>
      </Router>
    )
  }
}

export default App;