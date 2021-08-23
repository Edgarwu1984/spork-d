import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { FaTimes } from 'react-icons/fa';

export default function Modal({ show, onClose, title, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = e => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className='modal__overlay'>
      <div className='modal__container'>
        <div className='modal__header'>
          <button className='modal__header-btn' onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <h3 className='modal__title'>{title}</h3>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(modalContent, document.getElementById('root'));
  } else {
    return null;
  }
}
