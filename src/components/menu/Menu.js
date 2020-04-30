import React from 'react';

// Components
import MenuItem from '../menuItem/MenuItem';

// Styles
import * as Styled from './menuStyles';

const Menu = () => (
  <Styled.Menu>
    <MenuItem name="Home" url="/" />
    <MenuItem name="Recipes list" url="/recipes" />
    <MenuItem name="Add new recipe" url="/create_recipe" />
  </Styled.Menu>
);

export default Menu;
