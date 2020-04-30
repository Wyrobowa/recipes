import styled from 'styled-components';

const RecipesList = styled.div`
  display: flex;
`;

const RecipeWrapper = styled.div`
  flex: 1 1 0;
  margin: .5em;
  ${({ imgUrl }) => imgUrl && `
    background-image: url("${imgUrl}");
  `};
  background-size: cover;
  background-position: center;
`;

const Recipe = styled.div`
  padding: 1em;
  margin: .5em;
  border: 1px solid ${({ theme }) => theme.colors.grey20};
  background-color: rgba(255, 255, 255, 0.7);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const Item = styled.div`
  margin-bottom: .5em;
`;

const Title = styled(Item)`
  font-size: 2em;
  text-align: center;
`;

const RecipeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
`;

export {
  RecipesList,
  RecipeWrapper,
  Recipe,
  Item,
  Title,
  RecipeFooter,
};
