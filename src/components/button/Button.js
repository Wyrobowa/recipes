import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type, onClick, children,
}) => (
  <button
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
