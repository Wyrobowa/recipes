import styled from 'styled-components';

const Field = styled.div`
  ${({ title, theme }) => title === true && `
    font-family: ${theme.fonts.secondary};
    font-size: 4em;
  `}
`;

export {
  Field,
};
