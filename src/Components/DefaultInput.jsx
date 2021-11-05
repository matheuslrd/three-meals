import React from 'react';
import PropTypes from 'prop-types';

function DefaultInput(props) {
  const { type, id, name, text, onChange, placeholder, className } = props;
  return (
    <label htmlFor={ id } className={ className }>
      { text }
      <input
        type={ type }
        id={ id }
        name={ name }
        data-testid={ id }
        onChange={ onChange }
        placeholder={ placeholder }
      />
    </label>
  );
}

DefaultInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

DefaultInput.defaultProps = { name: '', text: '', placeholder: '', className: '' };

export default DefaultInput;
