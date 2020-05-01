import styled from 'styled-components';

const Banner = styled.div`
  width: 100%;
  height: 12em;
  background-color: ${({ theme }) => theme.colors.grey10};
  ${({ imgUrl }) => imgUrl && `
    background-image: url("${imgUrl}");
    background-size: cover;
    background-position: center;
  `}
`;

export {
  Banner,
};
