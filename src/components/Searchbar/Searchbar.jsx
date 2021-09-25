import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import styles from './Searchbar.module.css';

export default class Searchbar extends React.Component {
  static propTypes = { onSubmit: PropTypes.func };

  state = {
    searchInput: '',
  };

  handleInput = event => {
    this.setState({ searchInput: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchInput.trim() === '') {
      return toast.error('Please type your query!');
    }

    this.props.submit(this.state.searchInput);
    this.setState({ searchInput: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleInput}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchInput}
          />
        </form>
      </header>
    );
  }
}
