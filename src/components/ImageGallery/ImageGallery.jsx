import { useState, useEffect } from 'react';
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

export default function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.idle);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');
  const [modalImageALT, setModalImageALT] = useState('');

  useEffect(() => {
    if (searchQuery !== '' && page === 1) {
      setStatus(STATUS.pending);
      setPage(1);
      setImages([]);

      fetch(
        `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => response.json())
        .then(data => {
          if (data.hits.length > 0) {
            setImages([...data.hits]);
            setStatus(STATUS.resolved);
          } else toast.error(`no data on your request '${searchQuery}'`);
        })
        .catch(error => {
          setStatus(STATUS.rejected);
          setError(error);
          setImages([]);

          toast.error(`${error.message}`);
        })
        .finally(() => {
          scrolling();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) {
      setStatus(STATUS.pending);

      fetch(
        `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => response.json())
        .then(data => {
          if (data.hits.length > 0) {
            setImages(state => [...state, ...data.hits]);
            setStatus(STATUS.resolved);
          } else toast.error(`no data on your request '${searchQuery}'`);
        })
        .catch(error => {
          setStatus(STATUS.rejected);
          setError(error);
          setImages([]);

          toast.error(`${error.message}`);
        })
        .finally(() => {
          scrolling();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  const scrolling = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  const toggleModal = (url, alt) => {
    setShowModal(!showModal);
    setModalImageURL(url);
    setModalImageALT(alt);
  };

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
              onModal={toggleModal}
              alt={image.tags}
            />
          ))}
        </ul>
        <Button loadMore={handleLoadMore} />
        {showModal && (
          <Modal
            onModal={toggleModal}
            modalImg={modalImageURL}
            modalImgALT={modalImageALT}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = { searchQuery: PropTypes.string };
