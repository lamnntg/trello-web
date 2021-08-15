import React, { useEffect, useState, useRef } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from 'utilities/dragDrop';
import {
  Container as BootstrapContainer, Row,
  Col, InputGroup, FormControl, Button
} from 'react-bootstrap';
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { initialData } from 'actions/innitialData'
import { isEmpty } from 'lodash';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [addNewColumnForm, setAddNewColumnForm] = useState(false);
  const [newNameColumn, setNewNameColumn] = useState('');

  const newColumnInputRef = useRef(null);

  useEffect(() => {
    const boardFromDb = initialData.board.find(board => board.id === 'board-1');
    if (boardFromDb) {
      setBoard(boardFromDb);

      //sort columns
      boardFromDb.columns.sort(function(a, b) {
        return boardFromDb.columnOrder.indexOf(a.id) - boardFromDb.columnOrder.indexOf(b.id);
      });
      setColumns(boardFromDb.columns);
    }
  }, []);

  useEffect(() => {
    if (addNewColumnForm) {
      newColumnInputRef.current.focus();
    }
  }, [addNewColumnForm])

  if (isEmpty(board)) {
    return (<div className="BoardContent" style={{ color: 'white', padding: '10px', fontSize: '20px' }}>Not Found</div>);
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    setColumns(newColumns);

    let newBoard ={ ...board };
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

  const toggleOpenNewColumnForm = function() {
    setAddNewColumnForm(!addNewColumnForm);
    if (!addNewColumnForm) {
      setNewNameColumn('');
    }
  }

  const addNewColumn = () => {
    if (newNameColumn == '') {
      newColumnInputRef.current.focus();
      return
    }
    const newColumnToAdd = {
      id: 'column-' + Math.random() * 5,
      boardId: board.id,
      title: newNameColumn,
      cardOrder: [],
      card: []
    }
    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);
    setColumns(newColumns);

    let newBoard ={ ...board };
    newBoard.columnOrder = newColumns.map(column => column.id);
    newBoard.columns = newColumns.map(column => column);

    setBoard(newBoard);
    setNewNameColumn('');
    toggleOpenNewColumnForm();
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
              <Column column={column} onCardDrop={onCardDrop} />
            </Draggable>
          );
        })}
      </Container>

      <BootstrapContainer className="trello-container">
        {addNewColumnForm ?
          <Row>
            <Col className="form-new-column">
              <InputGroup size="sm">
                <FormControl aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="input enter new column"
                  className="input-new-column"
                  ref={newColumnInputRef}
                  value={newNameColumn}
                  onChange={(e) => setNewNameColumn(e.target.value)}
                  onKeyDown={
                    (e) => {
                      if (e.key === 'Enter') {
                        addNewColumn();
                      }
                    }
                  }
                />
              </InputGroup>
              <Button
                variant="success"
                className="button-add-column" size="sm"
                onClick={addNewColumn}
              >
                Add Column
              </Button>
              <span className="cancel-add-column"
                onClick={toggleOpenNewColumnForm}
              >
                <i className="fa fa-times "></i>
              </span>
            </Col>
          </Row>
          :
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon"></i>Add new column
            </Col>
          </Row>
        }
      </BootstrapContainer>
    </div>
  );
}
export default BoardContent;