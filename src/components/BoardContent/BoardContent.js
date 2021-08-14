import React, { useEffect, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from 'utilities/dragDrop';

import './BoardContent.scss'
import Column from 'components/Column/Column'

import { initialData } from 'actions/innitialData'
import { isEmpty } from 'lodash';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [test, setTest] = useState('board-1');

  useEffect(() => {
    const boardFromDb = initialData.board.find(board => board.id === test);
    if (boardFromDb) {
      setBoard(boardFromDb);

      //sort columns
      boardFromDb.columns.sort(function(a, b) {
        return boardFromDb.columnOrder.indexOf(a.id) - boardFromDb.columnOrder.indexOf(b.id);
      });
      setColumns(boardFromDb.columns);
    }
  }, []);

  if (isEmpty(board)) {
    return (<div className="BoardContent" style={{ color: 'white', padding: '10px', fontSize: '20px' }}>Not Found</div>);
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    setColumns(newColumns);

    let newBoard ={...board};
    newBoard.columnOrder = newColumns.map(column => column.id);
    newBoard.columns = newColumns.map(column => column);

    setBoard(newBoard);
  }

  const onCardDrop = function(columnId, dropResult) {
    if (dropResult.addedIndex != null || dropResult.removedIndex != null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find(column => column.id === columnId);
      currentColumn.card = applyDrag(currentColumn.card, dropResult);
      currentColumn.cardOrder = currentColumn.card.map(i => i.id);
      setColumns(newColumns);
    }
  };

  return (
    <div className="board-columns">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        getChildPayload={(index) => columns[index]}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'columns-drop-preview'
        }}
      >
        {columns.map((column, index) => {
          return (
            <Draggable key={index}>
              <Column column={column} onCardDrop={onCardDrop} />
            </Draggable>
          );
        })}
      </Container>
      <div className="add-new-column">
        <i className="fa fa-plus icon"></i>Add new column
      </div>
    </div>
  );
}
export default BoardContent;