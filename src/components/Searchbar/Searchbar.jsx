import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ImageGallery from '../ImageGallery/ImageGallery';
import styles from './Searchbar.module.css';

export default function Searchbar() {
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');

  const handleInput = event => {
    setSearchInput(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchInput.trim() === '') {
      return toast.error('Please type your query!');
    }

    setQuery(searchInput);
    setSearchInput('');
  };

  return (
    <>
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={handleInput}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchInput}
          />
        </form>
      </header>
      <ImageGallery searchQuery={query} />
    </>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func };
