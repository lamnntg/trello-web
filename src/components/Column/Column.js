import { React, useState, useEffect } from 'react';
// import { Container, Draggable } from "react-smooth-dnd";
import parse from 'html-react-parser';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants';
import './Column.scss'
import Card from 'components/Card/Card';
import ConfirmModal from 'components/Common/ConfirmModal';
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown, Form } from 'react-bootstrap'

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = column.card;
  const [ showConfirmModal, setShowConfirmModal ] = useState(false);
  const [ columnTitle, setColumnTitle ] = useState('');
  //sort card
  cards.sort(function(a, b) {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title])

  // todo Dung useEffect ntn thi no se bi callback nhieu lan
  // useEffect(() => {
  //   const newColumn = {
  //     ...column,
  //     _title: columnTitle
  //   }
  //   onUpdateColumn(newColumn);
  // }, [columnTitle])
  const handleOnBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn);
  }
  const onAction = (action) => {
    if (action == MODAL_ACTION_CLOSE) {
      setShowConfirmModal(false);
    }
    if (action == MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn);
    }
    toggleShowConfirmModal();
  }
  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  }

  const selectAllInlineText = (e) => {
    e.target.focus();
    e.target.select();
  }
  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control aria-label="Small"
            type="text"
            className="trello-web-input-title"
            value={columnTitle}
            onClick={selectAllInlineText}
            onChange={(e) => {setColumnTitle(e.target.value)}}
            onBlur={handleOnBlur}
            onKeyDown={
              (e) => {
                if (e.key === 'Enter') {
                  setColumnTitle(e.target.value);
                  e.target.blur();
                }
              }
            }
          />
        </div>
        <div className="column-drop-down">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="drop-down btn">
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column</Dropdown.Item>
              <Dropdown.Item>Remove all card</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
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
      <ConfirmModal
        show={showConfirmModal}
        content={parse('<b>Bạn có chắc chắn muốn xóa</b>')}
        title="Xác nhận xóa"
        onAction={onAction}
      />
    </div>
  );
}

export default Column;