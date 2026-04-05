import type { ChangeEvent } from 'react';
import { Box, Input } from 'tharaday';
import type { ProductFormValues } from '../helpers/productFormHelpers.ts';

type ProductFormFieldsProps = {
  prefix: string;
  values: ProductFormValues;
  onChange: (field: keyof ProductFormValues, value: string) => void;
  showError: boolean;
  errorMessage?: string;
};

const ProductFormFields = ({
  prefix,
  values,
  onChange,
  showError,
  errorMessage,
}: ProductFormFieldsProps) => (
  <Box display="grid" gap={2}>
    <Input
      id={`${prefix}-name`}
      label="Product name"
      placeholder="e.g. Tomato"
      value={values.name}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('name', event.target.value)}
      error={showError}
      helperText={showError ? errorMessage : undefined}
      fullWidth
    />
    <Input
      id={`${prefix}-unit`}
      label="Unit"
      placeholder="e.g. g"
      value={values.unit}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('unit', event.target.value)}
      fullWidth
    />
    <Input
      id={`${prefix}-kcal`}
      type="number"
      label="Calories (kcal)"
      placeholder="0"
      value={values.kcal}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('kcal', event.target.value)}
      fullWidth
    />
    <Input
      id={`${prefix}-protein`}
      type="number"
      label="Protein (g)"
      placeholder="0"
      value={values.protein_g}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('protein_g', event.target.value)}
      fullWidth
    />
    <Input
      id={`${prefix}-carbs`}
      type="number"
      label="Carbohydrates (g)"
      placeholder="0"
      value={values.carbs_g}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('carbs_g', event.target.value)}
      fullWidth
    />
    <Input
      id={`${prefix}-fat`}
      type="number"
      label="Fat (g)"
      placeholder="0"
      value={values.fat_g}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange('fat_g', event.target.value)}
      fullWidth
    />
  </Box>
);

export default ProductFormFields;
