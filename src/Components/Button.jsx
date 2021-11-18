import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button(props) {
  const { children, className, dataTestId, id,
    disabled, onClick, src, hasLink } = props;

  function getButton() {
    return (
      <button
        type="button"
        className={ className }
        id={ id }
        disabled={ disabled }
        onClick={ onClick }
        data-testid={ dataTestId }
        src={ src }
      >
        { children }
      </button>
    );
  }
  return (
    hasLink.length > 0 ? (
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  src: PropTypes.string,
  hasLink: PropTypes.string,
};

Button.defaultProps = {
  id: '',
  className: '',
  dataTestId: '',
  disabled: false,
  onClick: () => {},
  src: '',
  hasLink: '',
};

export default Button;
