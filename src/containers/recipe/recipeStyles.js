import styled from 'styled-components';

const Recipe = styled.div`
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.grey10};
`;

const RecipeHeader = styled.div`
  position: relative;
`;

const RecipeHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: .5em 0;
  background-color: rgba(255, 255, 255, 0.7);
`;

export {
  Recipe,
  RecipeHeader,
  RecipeHeaderWrapper,
};
