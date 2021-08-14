import React from 'react';
// import { Container, Draggable } from "react-smooth-dnd";

import './Column.scss'
import Card from 'components/Card/Card';
import { Container, Draggable } from 'react-smooth-dnd';

function Column(props) {
  const { column, onCardDrop } = props;
  const cards = column.card;

  //sort card
  cards.sort(function(a, b) {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  return (
    <div className="column">
      <header className="column-drag-handle">{props.column.title}</header>
      <div className="card-list">
        <Container
          {...column.props}
          groupName="column"
          // onDragStart={e => console.log('drag started', e)}
          // onDragEnd={e => console.log('drag end', e)}
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dragHandleSelector=".card-item"
          // onDragEnter={() => {
          //   console.log('drag enter:', column.id);
          // }}
          // onDragLeave={() => {
          //   console.log('drag leave:', column.id);
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'drop-preview' 
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) =>
            (
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>
            )
          )}
        </Container>
      </div>
      <footer className="footer">
        <div className="footer-action">
          <i className="fa fa-plus icon"></i>Add another card
        </div>
      </footer>
    </div>
  );
}

export default Column;