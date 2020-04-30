import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './menuItemStyles';

const MenuItem = ({ name, url }) => (
  <Styled.MenuItem>
    <Styled.MenuLink to={url}>{name}</Styled.MenuLink>
  </Styled.MenuItem>
);

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default MenuItem;
