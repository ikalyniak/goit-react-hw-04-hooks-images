import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ modalImg, modalImgALT, onModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onModal();
    }
  };
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={modalImg} alt={modalImgALT} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onModal: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
  modalImgALT: PropTypes.string.isRequired,
};
