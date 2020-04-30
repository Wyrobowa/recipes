import styled from 'styled-components';

const Image = styled.img`
  display: inline-block;
  
  ${({ size }) => size === 'small' && `
    width: 100px;
    height: 100px;
  `};
  
  ${({ size }) => size === 'medium' && `
    width: 200px;
    height: 200px;
  `};
  
  ${({ size }) => size === 'large' && `
    width: 300px;
    height: 300px;
  `};
  
  ${({ size }) => size === 'background' && `
    width: 100%;
    height: 100%  ;
  `};
`;

export {
  Image,
};
