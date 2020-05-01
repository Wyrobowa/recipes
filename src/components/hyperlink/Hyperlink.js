import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './hyperlinkStyles';

const Hyperlink = ({
  url, children,
}) => (
  <Styled.Hyperlink to={url}>
    {children}
  </Styled.Hyperlink>
);

Hyperlink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default Hyperlink;
