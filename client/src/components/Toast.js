import React from 'react';

const Toast = ({message, showToast}) => {
  return (
    <Toast show={showToast}>
      <Toast.Header>
        <strong className="me-auto">Trusty ToDo</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default Toast;
