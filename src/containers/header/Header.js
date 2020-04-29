import React from 'react';
import PropTypes from 'prop-types';

// Components
import Menu from '../../components/menu/Menu';

const Header = ({ appName }) => (
  <header>
    <h1>{appName}</h1>
    <Menu />
  </header>
);

Header.propTypes = {
  appName: PropTypes.string,
};

Header.defaultProps = {
  appName: 'React App',
};

export default Header;
