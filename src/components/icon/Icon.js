import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './iconStyles';

const Icon = ({ className }) => (
  <Styled.Icon className={`fas fa-${className}`} />
);

Icon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Icon;
