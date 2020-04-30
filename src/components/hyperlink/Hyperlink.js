import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './hyperlinkStyles';

const Hyperlink = ({
  url, name,
}) => (
  <Styled.Hyperlink to={url}>
    {name}
  </Styled.Hyperlink>
);

Hyperlink.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Hyperlink;
