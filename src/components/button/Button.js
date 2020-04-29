import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({
  type, children, onClick, url,
}) => (
  <>
    {type === 'button' && (
      <Button
        onClick={onClick}
        type="button"
      >
        {children}
      </Button>
    )}
    {type === 'link' && (
      <Link to={url}>
        {children}
      </Link>
    )}
  </>
);

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'link']),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func,
  url: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  url: '',
};

export default Button;
