import React, { useEffect, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import './BoardContent.scss'
import Column from 'components/Column/Column'

import { initialData } from 'actions/innitialData'
import { isEmpty } from 'lodash';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [test, setTest] = useState('board-1');
  const [scene, setScene] = useState({});

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
    return (<div className="BoardContent" style={{color: 'white', padding: '10px', fontSize: '20px'}}>Not Found</div>);
  }

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
    // const scene = Object.assign({}, this.state.scene);
    // scene.children = applyDrag(scene.children, dropResult);
    // setScene({scene});
  }
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
              <Column column={column} />
            </Draggable>
          );
        })};
      </Container>
    </div>
  );
}

export default BoardContent;