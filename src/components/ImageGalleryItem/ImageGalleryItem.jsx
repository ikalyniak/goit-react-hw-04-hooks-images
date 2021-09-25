import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    openModal: PropTypes.func,
  };

  render() {
    const { src, alt, onModal, largeImg } = this.props;
    return (
      <li
        className={styles.ImageGalleryItem}
        onClick={() => onModal(largeImg, alt)}
      >
        <img src={src} alt={alt} className={styles.ImageGalleryItemImage} />
      </li>
    );
  }
}

export default ImageGalleryItem;
