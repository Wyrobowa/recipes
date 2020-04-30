import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Hyperlink = styled(Link)`
  padding: .5em 0;
  text-decoration: none;
  color: hsl(187, 100%, 18%);
  background-color: transparent;
  
  &:hover {
    color: hsl(187, 100%, 8%);
    text-decoration: underline;
  }
`;

export {
  Hyperlink,
};
