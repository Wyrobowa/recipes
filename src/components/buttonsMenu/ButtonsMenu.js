import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as Styled from './buttonsMenuStyles';

const ButtonsMenu = ({
  children,
}) => (
  <Styled.ButtonsMenu>
    {children}
  </Styled.ButtonsMenu>
);

ButtonsMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default ButtonsMenu;
