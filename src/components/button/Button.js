import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './buttonStyles';

const Button = ({
  type, model, onClick, children,
}) => (
  <Styled.Button
    type={type}
    model={model}
    onClick={onClick}
  >
    {children}
  </Styled.Button>
);

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  model: PropTypes.oneOf(['success', 'warning', 'danger', 'info']),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: 'button',
  model: 'info',
};

export default Button;
