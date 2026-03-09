import { Box, Loader, Notification, Text } from 'tharaday';
import RecipeListItem from './RecipeListItem.tsx';
import { useRecipes } from '../hooks/useRecipes.ts';

const RecipesList = () => {
  const { recipes, isLoading, error } = useRecipes();

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" gap={2} paddingY={2}>
        <Loader size="sm" intent="info" />
        <Text as="p" variant="body-md" color="subtle">
          Loading recipes...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Notification intent="danger" title="Could not load recipes">
        {error}
      </Notification>
    );
  }

  if (recipes.length === 0) {
    return (
      <Notification intent="neutral" title="No recipes found">
        Add your first recipe to get started.
      </Notification>
    );
  }

  return (
    <Box as="ul" display="grid" gap={3} margin={0} padding={0} style={{ listStyle: 'none' }}>
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </Box>
  );
};

export default RecipesList;
