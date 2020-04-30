import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.main.fontSize};
  color: ${({ theme }) => theme.colors.primaryFont};
  min-height: 100vh;
`;

const Content = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.main.footerHeight});
`;

export {
  GlobalStyle,
  App,
  Content,
};
