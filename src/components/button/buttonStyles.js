import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  text-align: center;
  padding: .5em 1em;
  color: #fff;
  font-size: 1em;
  border-radius: .25em;
  
  ${({ model }) => model === 'success' && `
    background-color: #17a2b8;
    border-color: #17a2b8;

    &:hover {
      background-color: #138496;
      border-color: #117a8b;
    }
  `};
  
  ${({ model }) => model === 'success' && `
    background-color: #28a745;
    border-color: #28a745;

    &:hover {
      background-color: #218838;
      border-color: #1e7e34;
    }
  `};
`;

export {
  Button,
};
