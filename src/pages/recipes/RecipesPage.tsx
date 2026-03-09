import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Text } from 'tharaday';
import { RecipesList } from '../../features/recipes/index.ts';

const RecipesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <Box as="main" className="page" paddingY={6}>
      <Box as="section" aria-label="Recipes">
        <Card bordered>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text as="span" variant="h2" weight="bold">
                  Recipes
                </Text>
                <Button intent="info" onClick={() => setIsCreateModalOpen(true)}>
                  Add recipe
                </Button>
              </Box>
            }
          />
          <CardContent>
            <RecipesList
              isCreateModalOpen={isCreateModalOpen}
              onCloseCreateModal={() => setIsCreateModalOpen(false)}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RecipesPage;
