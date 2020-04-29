import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  fieldType, labelText, id, value, onChange,
}) => (
  <div>
    {labelText && (
      <label htmlFor={id}>{labelText}</label>
    )}
    {fieldType === 'input' && (
      <input
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
      />
    )}
    {fieldType === 'textarea' && (
      <textarea
        id={id}
        name={id}
        onChange={onChange}
        value={value || ''}
      />
    )}
  </div>
);

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  fieldType: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

TextField.defaultProps = {
  value: '',
  fieldType: 'input',
};

export default TextField;
