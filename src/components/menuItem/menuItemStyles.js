import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuItem = styled.span`
  display: flex;
  align-items: center;
  padding-left: 2em;
`;

const MenuLink = styled(Link)`
  font-weight: bold;
  color: hsl(187, 100%, 18%);
  text-decoration: none;
  
  &:hover {
    color: hsl(187, 100%, 8%);
  }
`;

export {
  MenuItem,
  MenuLink,
};
