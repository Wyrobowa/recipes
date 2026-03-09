import { Box, Card, CardContent, CardHeader } from 'tharaday';
import { CategoriesList } from '../../features/categories/index.ts';

const CategoriesPage = () => (
  <Box as="main" className="page" paddingY={6}>
    <Box as="section" aria-label="Categories">
      <Card bordered>
        <CardHeader title="All categories" />
        <CardContent>
          <CategoriesList />
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CategoriesPage;
