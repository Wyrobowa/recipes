import styled from 'styled-components';

const RecipesList = styled.div`
  display: flex;
`;

const RecipeWrapper = styled.div`
  margin: .5em;
  background: url("http://localhost:3000/img/bread.jpeg") no-repeat fixed center;
`;

const Recipe = styled.div`
  padding: 1em;
  margin: .5em;
  border: 1px solid hsl(0, 0%, 90%);
  background-color: rgba(255, 255, 255, 0.5);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.75);
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
  RecipeWrapper,
  Recipe,
  Item,
  Title,
  RecipeFooter,
};
