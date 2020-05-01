import React from 'react';

// Components
import MenuItem from '../menuItem/MenuItem';

// Styles
import * as Styled from './menuStyles';

const Menu = () => (
  <Styled.Menu>
    <MenuItem name="Recipes list" url="/" icon="list" />
    <MenuItem name="Add new recipe" url="/create_recipe" icon="plus" />
  </Styled.Menu>
);

export default Menu;
