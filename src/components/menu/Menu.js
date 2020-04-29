import React from 'react';

// Components
import MenuItem from '../menuItem/MenuItem';

const Menu = () => (
  <nav>
    <MenuItem name="Home" url="/" />
    <MenuItem name="Recipes list" url="/recipes" />
    <MenuItem name="Add new recipe" url="/create_recipe" />
  </nav>
);

export default Menu;
