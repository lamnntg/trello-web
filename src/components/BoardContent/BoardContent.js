import React, { useEffect, useState  } from 'react';

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
  }, [])  

  if (isEmpty(board)) {
    return (<div className="BoardContent" style={{color: "white", padding: "10px", fontSize: "20px"}}>Not Found</div>);    
  }

  return (
    <div className="board-columns">
      {columns.map((column, index) => {
        return (<Column key={index} column={column} />);
      })};
    </div>
  );
}

export default BoardContent;