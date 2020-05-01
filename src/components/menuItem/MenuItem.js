import React from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from '../icon/Icon';

// Styles
import * as Styled from './menuItemStyles';

const MenuItem = ({ name, url, icon }) => (
  <Styled.MenuItem>
    {icon && (
      <Icon className={icon} />
    )}
    <Styled.MenuLink to={url}>{name}</Styled.MenuLink>
  </Styled.MenuItem>
);

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

MenuItem.defaultProps = {
  icon: '',
};

export default MenuItem;
