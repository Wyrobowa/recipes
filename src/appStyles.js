import styled from 'styled-components';

const App = styled.div`
  font-family: 'open_sans', sans-serif;
  font-size: 15px;
  color: hsl(0, 0%, 20%);
  min-height: 100vh;
`;

const Content = styled.div`
  min-height: calc(100vh - 4em);
`;

export {
  App,
  Content,
};
