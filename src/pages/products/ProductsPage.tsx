import { Box, Card, CardContent, CardHeader } from 'tharaday';
import { ProductsList } from '../../features/products/index.ts';

const ProductsPage = () => (
  <Box as="main" className="page" paddingY={6}>
    <Box as="section" aria-label="Products">
      <Card bordered>
        <CardHeader title="All products" />
        <CardContent>
          <ProductsList />
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default ProductsPage;
