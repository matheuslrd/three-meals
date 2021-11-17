import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({ children, className, dataTestId, id, onClick, src, hasLink }) {
  function getButton() {
    return (
      <button
        className={ className }
        data-testid={ dataTestId }
        id={ id }
        type="button"
        onClick={ onClick }
        src={ src }
      >
        { children }
      </button>
    );
  }
  return (
    hasLink.length > 1 ? (
      <Link to={ hasLink }>
        { getButton() }
      </Link>) : getButton()
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string,
  hasLink: PropTypes.string,
};

Button.defaultProps = {
  id: null,
  className: null,
  dataTestId: null,
  onClick: () => {},
  src: '',
  hasLink: '',
};

export default Button;
