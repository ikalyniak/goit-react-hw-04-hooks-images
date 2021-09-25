import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

function Button({ loadMore }) {
  return (
    <button type="button" className={styles.Button} onClick={loadMore}>
      Load more...
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
