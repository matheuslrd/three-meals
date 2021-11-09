import React from 'react';

import PropTypes from 'prop-types';

function Button({ children, className, dataTestId, id, onClick, src }) {
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

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
};

Button.defaultProps = {
  id: null,
  className: null,
  dataTestId: null,
  onClick: () => {},
};

export default Button;
