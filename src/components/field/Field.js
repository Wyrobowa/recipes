import React from 'react';
import PropTypes from 'prop-types';

const Field = ({ tag: Tag, value, label }) => (
  <div>
    {label && (
      <label htmlFor={value}>{label}</label>
    )}
    <Tag id={value}>{value}</Tag>
  </div>
);

Field.propTypes = {
  tag: PropTypes.oneOf(['h1', 'span']),
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Field.defaultProps = {
  tag: 'span',
  label: null,
};

export default Field;
