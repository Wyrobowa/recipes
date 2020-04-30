import React from 'react';
import PropTypes from 'prop-types';

// Components
import Menu from '../../components/menu/Menu';

// Styles
import * as Styled from './headerStyles';

const Header = ({ appName }) => (
  <Styled.Header>
    <Styled.Title>{appName}</Styled.Title>
    <Menu />
  </Styled.Header>
);

Header.propTypes = {
  appName: PropTypes.string,
};

Header.defaultProps = {
  appName: 'React App',
};

export default Header;
