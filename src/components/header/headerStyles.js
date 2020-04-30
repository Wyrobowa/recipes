import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4em;
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
