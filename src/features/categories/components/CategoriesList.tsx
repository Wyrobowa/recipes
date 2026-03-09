import { Box, Card, CardContent, Loader, Notification, Text } from 'tharaday';
import { useCategories } from '../hooks/useCategories.ts';

const CategoriesList = () => {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" gap={2} paddingY={2}>
        <Loader size="sm" intent="info" />
        <Text as="p" variant="body-md" color="subtle">
          Loading categories...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Notification intent="danger" title="Could not load categories">
        {error}
      </Notification>
    );
  }

  if (categories.length === 0) {
    return (
      <Notification intent="neutral" title="No categories found">
        Add your first category to get started.
      </Notification>
    );
  }

  return (
    <Box as="ul" display="grid" gap={3} margin={0} padding={0} style={{ listStyle: 'none' }}>
      {categories.map((category) => (
        <Box as="li" key={category.id}>
          <Card bordered>
            <CardContent>
              <Text as="h3" variant="h6" marginBottom={1}>
                {category.name}
              </Text>
              {category.slug ? (
                <Text as="p" variant="body-sm" color="subtle">
                  /{category.slug}
                </Text>
              ) : null}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default CategoriesList;
