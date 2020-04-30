import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './textFieldStyles';

const TextField = ({
  fieldType, labelText, id, value, onChange,
}) => (
  <Styled.TextField>
    {labelText && (
      <Styled.Label htmlFor={id}>{labelText}</Styled.Label>
    )}
    {fieldType === 'input' && (
      <Styled.Input
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
  </Styled.TextField>
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
