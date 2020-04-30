import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Hyperlink = styled(Link)`
  padding: .5em;
  text-decoration: none;
  color: hsl(187, 100%, 18%);
  
  &:hover {
    color: hsl(187, 100%, 8%);
    text-decoration: underline;
  }
`;

export {
  Hyperlink,
};
