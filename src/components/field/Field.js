import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './fieldStyles';

const Field = ({
  tag: Tag, value, label, title,
}) => (
  <Styled.Field tag={Tag} title={title}>
    {label && (
      <label htmlFor={value}>{label}</label>
    )}
    {!title && (
      <Tag id={value}>{value}</Tag>
    )}
    {title && (
      <span id={value}>{value}</span>
    )}
  </Styled.Field>
);

Field.propTypes = {
  tag: PropTypes.oneOf(['h1', 'span']),
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  title: PropTypes.oneOf(['main', 'other']),
};

Field.defaultProps = {
  tag: 'span',
  label: null,
  title: 'other',
};

export default Field;
