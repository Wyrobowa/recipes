import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: .5em 0;
  background-color: hsl(0, 0%, 95%);
`;

const Title = styled.span`
  font-size: 2em;
  font-weight: bold;
`;

export {
  Header,
  Title,
};
