import { Box, Card, CardContent, Text } from 'tharaday';
import { getRecipeDescription } from '../helpers/recipeHelpers.ts';
import type { Recipe } from '../types.ts';

type RecipeListItemProps = {
  recipe: Recipe;
};

const RecipeListItem = ({ recipe }: RecipeListItemProps) => (
  <Box as="li">
    <Card bordered>
      <CardContent>
        <Text as="h3" variant="h6" marginBottom={1}>
          {recipe.name}
        </Text>
        <Text as="p" variant="body-md" color="subtle">
          {getRecipeDescription(recipe)}
        </Text>
      </CardContent>
    </Card>
  </Box>
);

export default RecipeListItem;
