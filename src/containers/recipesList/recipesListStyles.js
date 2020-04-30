import styled from 'styled-components';

const RecipesList = styled.div`
  display: flex;
`;

const Recipe = styled.div`
  padding: 1em;
  margin: .5em;
  border: 1px solid hsl(0, 0%, 90%);
  
  &:hover {
    background-color: hsl(0, 0%, 90%);
  }
`;

const Item = styled.div`
  
`;

const Title = styled(Item)`
  font-size: 1.5em;
  text-align: center;
`;

const RecipeFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  RecipesList,
  Recipe,
  Item,
  Title,
  RecipeFooter,
};
