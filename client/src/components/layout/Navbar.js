import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const onLogout = e => {
    e.preventDefault();
    logout();
  }
  
  const authLinks = ( 
    <ul className="flexcontainer flex-horiz" style={{width: "100%"}}>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">ALC</Link>
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
    <ul className="flexcontainer flex-horiz" style={{width: "100%"}}>
      <li className="nav-item">
        <Link to="/" className="nav-link">ALC</Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    </ul>
  );
  
  return (
    <nav className="flexcontainer flex-horiz">
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