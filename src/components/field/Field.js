import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './fieldStyles';

const Field = ({ tag: Tag, value, label }) => (
  <Styled.Field>
    {label && (
      <label htmlFor={value}>{label}</label>
    )}
    <Tag id={value}>{value}</Tag>
  </Styled.Field>
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
