import React from 'react';

import './Column.scss'
import Card from 'components/Card/Card';

function Column(props) {  
  const { column } = props;
  const cards = column.card;
  
  //sort card
  cards.sort(function(a, b) {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  return (
    <div className="column">
      <header>{props.column.title}</header>
      <ul className="card-list">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </ul>
      <footer className="footer">footer</footer>
    </div>
  );
}

export default Column;