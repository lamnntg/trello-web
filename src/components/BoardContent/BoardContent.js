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
import { defaultsDeep, isEmpty, cloneDeep } from 'lodash';
import { fetchBoard, createColumn, updateColumn, updateBoard, updateCard } from 'actions/Api';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [addNewColumnForm, setAddNewColumnForm] = useState(false);
  const [newNameColumn, setNewNameColumn] = useState('');

  const newColumnInputRef = useRef(null);

  useEffect(() => {
    // const boardFromDb = initialData.board.find(board => board.id === 'board-1');
    // console.log(boardFromDb);
    fetchBoard('613cec37b406417b13c2d9a2')
      .then(boardDB => {
        let boardApi = boardDB.result;
        if (boardApi) {
          boardApi.columns.sort(function(a, b) {
            return boardApi.columnOrder.indexOf(a._id) - boardApi.columnOrder.indexOf(b._id);
          });
        }
      
        setBoard(boardApi);
        setColumns(boardApi.columns);
        console.log(boardApi);
      });
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
    let newColumns = [...columns]; // spead operator

    newColumns = applyDrag(newColumns, dropResult);
    setColumns(newColumns);

    let newBoard = { ...board }; // spead operator
    newBoard.columnOrder = newColumns.map(column => column._id);
    newBoard.columns = newColumns.map(column => column);
    
    updateBoard(newBoard._id, { 
      title: newBoard.title,
      columnOrder: newBoard.columnOrder,
    }).then(updatedBoard => {
      const updateBoardData = {
        ...updatedBoard.result,
        columns: newColumns.columns,
      }
      setBoard(updateBoardData);
    }).catch(err => {
      console.log(err);
      setBoard({ ...board });
    });
  }

  const onCardDrop = function(columnId, dropResult) {
    if (dropResult.addedIndex != null || dropResult.removedIndex != null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find(column => column._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map(i => i._id);

      setColumns(newColumns);
      if (dropResult.addedIndex != null && dropResult.removedIndex != null) {
        updateColumn(columnId, currentColumn)
        .then(updatedColumn => {
          //todo handle
        })
        .catch(err => {
          //todo handle
        });
      } else {
        let currentCard = dropResult.payload;
        updateColumn(columnId, currentColumn);
        if (dropResult.addedIndex != null) {
          let newCard = {
            ...currentCard,            
            columnId: columnId,
          }
          updateCard(currentCard._id, newCard)
            .then((updatedCard) => {
              //todo handle
            })
        } 
      }
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
      boardId: board._id,
      title: newNameColumn,
    }

    createColumn(newColumnToAdd).then(newColumn => {
      console.log(newColumn);
      let newColumns = [...columns];

      newColumns.push(newColumn.result);
      setColumns(newColumns);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map(column => column._id);
      newBoard.columns = newColumns.map(column => column);
      console.log(newBoard);
      setNewNameColumn('');
      toggleOpenNewColumnForm();
    });
  }

  //props update card to column component
  const onUpdateColumn = (newColumnUpdate) => {
    const columnIdToUpdate = newColumnUpdate._id;
    const newColumns = [...columns];

    const indexOfItemUpdate = newColumns.findIndex(i => i._id === columnIdToUpdate);

    if (newColumnUpdate.__destroy) {
      newColumns.splice(indexOfItemUpdate, 1);
    } else {
      newColumns.splice(indexOfItemUpdate, 1, newColumnUpdate);
    }

    setColumns(newColumns);

    let newBoard ={ ...board };
    newBoard.columnOrder = newColumns.map(column => column._id);
    newBoard.columns = newColumns.map(column => column);

    setBoard(newBoard);
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
              <Column column={column}
                onCardDrop={onCardDrop}
                onUpdateColumn={onUpdateColumn}
              />
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
