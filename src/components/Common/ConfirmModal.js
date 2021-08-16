import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal(props) {
  const { title, content, show, onAction } = props;


  return (
    <>
      <Modal show={show}
        onHide={() => onAction('close')}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onAction('close')}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onAction('confirm')}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal

