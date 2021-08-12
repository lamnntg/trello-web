import React from 'react';

import './Column.scss'
import Task from 'components/Task/Task';

function Column() {
  return (
    <div className="column">
      <header>Header</header>
      <ul className="task-list">
        <Task />
        <li>Almost before we knew it.</li>
        <li>Almost before we knew it.</li>
        <li>Almost before we knew it.</li>
        <li>Almost before we knew it.</li>
        <li>Almost before we knew it.</li>
      </ul>
      <footer className="footer">footer</footer>
    </div>
  );
}

export default Column;