import type { FormEventHandler } from 'react';
import { Box, Button } from 'tharaday';
import type { ProductFormValues } from '../helpers/productFormHelpers.ts';
import ProductFormFields from './ProductFormFields.tsx';

type ProductCreateFormProps = {
  values: ProductFormValues;
  actionError: string | null;
  isCreating: boolean;
  onChange: (field: keyof ProductFormValues, value: string) => void;
  onSubmit: FormEventHandler<HTMLElement>;
};

const ProductCreateForm = ({
  values,
  actionError,
  isCreating,
  onChange,
  onSubmit,
}: ProductCreateFormProps) => (
  <Box as="form" onSubmit={onSubmit} display="grid" gap={2}>
    <ProductFormFields
      prefix="new-product"
      values={values}
      onChange={onChange}
      showError={Boolean(actionError)}
      errorMessage={actionError ?? undefined}
    />
    <Box display="flex" justifyContent="flex-end">
      <Button type="submit" isLoading={isCreating} intent="info">
        Add product
      </Button>
    </Box>
  </Box>
);

export default ProductCreateForm;
