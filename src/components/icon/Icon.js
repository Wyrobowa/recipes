import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './imageFieldStyles';

const ImageField = ({ name, src, size }) => (
  <Styled.Image src={src} alt={name} size={size} />
);

ImageField.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'background']),
};

ImageField.defaultProps = {
  src: 'http://localhost:3000/img/default.jpg',
  size: 'small',
};

export default ImageField;
