import React from 'react';

import './BoardBar.scss'

function BoardBar() {
  return (
    <nav className="navbar-board">
      <div className="navbar-board__container">
        <button className="navbar-btn"><i className="fa fa-list"></i></button>
        <button className="navbar-btn">+ Create new</button>

      </div>

      <div className="navbar-board__container">
      </div>

    </nav>
  )
}

export default BoardBar;