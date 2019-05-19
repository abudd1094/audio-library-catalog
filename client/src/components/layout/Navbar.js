import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const onLogout = e => {
    e.preventDefault();
    logout();
  }
  
  const authLinks = ( 
    <ul className="flexcontainer flex-horiz">
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <a onClick={onLogout} href="!#">
          <i className="fas fa-sign-out-alt"></i>{' '} 
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <div className="half-width">
    <ul className="flexcontainer flex-horiz">
      <li className="nav-item">
        <Link to="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    </ul>
    </div>
  );
  
  return (
    <nav className="flexcontainer flex-horiz">
      <div className="half-width">
        <h3 className="navbar-brand">
          <Link to="/">ALC</Link>
        </h3>
      </div>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) } 
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
}); 

export default connect(mapStateToProps, { logout })(Navbar); 