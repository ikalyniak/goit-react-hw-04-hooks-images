import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  static propTypes = {
    onModal: PropTypes.func.isRequired,
    modalImg: PropTypes.string.isRequired,
    modalImgALT: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onModal();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onModal();
    }
  };

  render() {
    const { modalImg, modalImgALT } = this.props;

    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={modalImg} alt={modalImgALT} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
