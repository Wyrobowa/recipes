import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Text } from 'tharaday';
import { CategoriesList } from '../../features/categories/index.ts';

const CategoriesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <Box as="main" className="page" paddingY={6}>
      <Box as="section" aria-label="Categories">
        <Card bordered>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text as="span" variant="h2" weight="bold">
                  Categories
                </Text>
                <Button intent="info" onClick={() => setIsCreateModalOpen(true)}>
                  Add category
                </Button>
              </Box>
            }
          />
          <CardContent>
            <CategoriesList
              isCreateModalOpen={isCreateModalOpen}
              onCloseCreateModal={() => setIsCreateModalOpen(false)}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CategoriesPage;
