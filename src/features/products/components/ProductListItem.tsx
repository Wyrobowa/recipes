import { Box, Button, Card, CardContent, Text } from 'tharaday';
import type { ProductFormValues } from '../helpers/productFormHelpers.ts';
import type { Product } from '../types.ts';
import ProductFormFields from './ProductFormFields.tsx';

type ProductListItemProps = {
  product: Product;
  isEditing: boolean;
  editingValues: ProductFormValues;
  isUpdating: boolean;
  isDeleting: boolean;
  onStartEditing: (product: Product) => void;
  onEditFieldChange: (field: keyof ProductFormValues, value: string) => void;
  onCancelEditing: () => void;
  onSave: (id: Product['id']) => void;
  onDelete: (id: Product['id'], name: string) => void;
};

const ProductListItem = ({
  product,
  isEditing,
  editingValues,
  isUpdating,
  isDeleting,
  onStartEditing,
  onEditFieldChange,
  onCancelEditing,
  onSave,
  onDelete,
}: ProductListItemProps) => (
  <Box as="li">
    <Card bordered>
      <CardContent>
        {isEditing ? (
          <Box display="grid" gap={2}>
            <ProductFormFields
              prefix={`edit-product-${product.id}`}
              values={editingValues}
              onChange={onEditFieldChange}
              showError={false}
            />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outline" onClick={onCancelEditing}>
                Cancel
              </Button>
              <Button intent="info" isLoading={isUpdating} onClick={() => onSave(product.id)}>
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Text as="h3" variant="h6" marginBottom={1}>
              {product.name}
            </Text>
            <Text as="p" variant="body-sm" color="subtle">
              Unit: {product.unit}
            </Text>
            <Text as="p" variant="body-sm" color="subtle">
              Protein: {product.protein_g} g | Carbs: {product.carbs_g} g | Fat: {product.fat_g} g
            </Text>
            <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
              <Button variant="outline" onClick={() => onStartEditing(product)}>
                Edit
              </Button>
              <Button
                intent="danger"
                variant="outline"
                isLoading={isDeleting}
                onClick={() => onDelete(product.id, product.name)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  </Box>
);

export default ProductListItem;
