import React from 'react';

// Styles
import * as Styled from './footerStyles';

const Footer = () => (
  <Styled.Footer>
    <Styled.FooterItem>2020</Styled.FooterItem>
    <Styled.FooterItem>
      Designed by
      <Styled.FooterLink url="https://www.google.com" name="Ania" />
    </Styled.FooterItem>
  </Styled.Footer>
);

export default Footer;
