import { Box, Card, CardContent, CardHeader } from 'tharaday';
import { RecipesList } from '../../features/recipes/index.ts';

const RecipesPage = () => (
  <Box as="main" className="page" paddingY={6}>
    <Box as="section" aria-label="Recipes">
      <Card bordered>
        <CardHeader title="All recipes" />
        <CardContent>
          <RecipesList />
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default RecipesPage;
