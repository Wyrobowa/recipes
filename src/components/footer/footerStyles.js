import styled from 'styled-components';

// Components
import Hyperlink from '../hyperlink/Hyperlink';

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => theme.main.footerHeight};
  background-color: hsl(0, 0%, 95%);
`;

const FooterItem = styled.div`
  font-weight: bold;
`;

const FooterLink = styled(Hyperlink)`
  font-weight: bold;
  margin-left: .5em;
`;

export {
  Footer,
  FooterItem,
  FooterLink,
};
