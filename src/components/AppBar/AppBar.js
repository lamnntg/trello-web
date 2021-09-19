import React from 'react';
import logo from '../../logo.png';
import './AppBar.scss'

function AppBar() {
  return (
    <nav className="navbar-app">
      <div className="navbar-list-btn left">
        <a className="button-nav"><i className="fa fa-ellipsis-v"></i></a>
        <a className="button-nav"><i className="fa fa-home"></i></a>
        <a className="button-nav"><i className="fa fa-table"></i></a>
        <input className="search-nav" type="text" placeholder="Search..." />
      </div>
      <div className="navbar-app__logo">
        <img src={logo} alt="logo" className="logo" />
        <span className="logo-title">Lam Nguyen</span>
      </div>
      <div className="navbar-list-btn right">
        <a className="button-nav"><i className="fa fa-question-circle"></i></a>
        <a className="button-nav"><i className="fa fa-bell"></i></a>
      </div>
    </nav>
  )
}

export default AppBar;