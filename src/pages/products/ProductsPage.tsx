import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Text } from 'tharaday';
import { ProductsList } from '../../features/products/index.ts';

const ProductsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <Box as="main" className="page" paddingY={6}>
      <Box as="section" aria-label="Products">
        <Card bordered>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text as="span" variant="h2" weight="bold">
                  Products
                </Text>
                <Button intent="info" onClick={() => setIsCreateModalOpen(true)}>
                  Add product
                </Button>
              </Box>
            }
          />
          <CardContent>
            <ProductsList
              isCreateModalOpen={isCreateModalOpen}
              onCloseCreateModal={() => setIsCreateModalOpen(false)}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductsPage;
