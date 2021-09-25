import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './ImageGallery.module.css';

const API_KEY = '22540552-ad6fedb3f5750c17229d327bb';
const BASE_URL = 'https://pixabay.com/api/';
const STATUS = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

class ImageGallery extends React.Component {
  static propTypes = { searchQuery: PropTypes.string };

  state = {
    images: [],
    page: 1,
    perPage: 12,
    status: STATUS.idle,
    error: null,
    showModal: false,
    modalImageURL: '',
    modalImageALT: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, perPage } = this.state;
    const { searchQuery } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ status: STATUS.pending });
      fetch(
        `${BASE_URL}?q=${this.props.searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
      )
        .then(response => response.json())
        .then(data => {
          if (data.hits.length > 0) {
            this.setState({
              images: [...data.hits],
              status: STATUS.resolved,
            });
          } else toast.error(`no data on your request '${searchQuery}'`);
        })
        .catch(error => {
          this.setState({
            status: STATUS.rejected,
            error,
            images: [],
          });
          toast.error(`${error.message}`);
        });
    }

    if (prevState.page !== page) {
      this.setState({ status: STATUS.pending });
      fetch(
        `${BASE_URL}?q=${this.props.searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
      )
        .then(response => response.json())
        .then(data => {
          if (data.hits.length > 0) {
            this.setState({
              images: [...prevState.images, ...data.hits],
              status: STATUS.resolved,
            });
          } else toast.error(`no data on your request '${searchQuery}'`);
        })
        .catch(error => {
          this.setState({ status: STATUS.rejected, error });
          toast.error(`${error.message}`);
        });
    }

    this.scrolling();
  }

  scrolling = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = (url, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImageURL: url,
      modalImageALT: alt,
    }));
  };

  render() {
    const { images, status, error, showModal } = this.state;

    if (status === STATUS.idle) {
      return <h2 className={styles.inscription}>Please type your query!</h2>;
    }

    if (status === STATUS.pending) {
      return (
        <div className={styles.loader}>
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />
        </div>
      );
    }

    if (status === STATUS.rejected) {
      return <h2 className={styles.inscription}>{error.message}</h2>;
    }

    if (status === STATUS.resolved) {
      return (
        <>
          <ul className={styles.ImageGallery}>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                largeImg={image.largeImageURL}
                onModal={this.toggleModal}
                alt={image.tags}
              />
            ))}
          </ul>
          <Button loadMore={this.handleLoadMore} />
          {showModal && (
            <Modal
              onModal={this.toggleModal}
              modalImg={this.state.modalImageURL}
              modalImgALT={this.state.modalImageALT}
            />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
