import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem(props) {
  const { src, alt, onModal, largeImg } = props;
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => onModal(largeImg, alt)}
    >
      <img src={src} alt={alt} className={styles.ImageGalleryItemImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func,
};
