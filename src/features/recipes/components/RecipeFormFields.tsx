import type { ChangeEvent } from 'react';
import { Box, Button, Divider, Input, Text } from 'tharaday';
import type { Category } from '../../categories/types.ts';
import type { Product } from '../../products/types.ts';
import type { RecipeFormValues } from '../helpers/recipeFormHelpers.ts';
import SearchableSelect from '../../shared/components/SearchableSelect.tsx';

type RecipeFormFieldsProps = {
  prefix: string;
  values: RecipeFormValues;
  categories: Category[];
  products: Product[];
  titleError?: string;
  isOptionsLoading?: boolean;
  onFieldChange: (field: Exclude<keyof RecipeFormValues, 'ingredients'>, value: string) => void;
  onIngredientChange: (index: number, field: 'productId' | 'quantity', value: string) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
};

const RecipeFormFields = ({
  prefix,
  values,
  categories,
  products,
  titleError,
  isOptionsLoading = false,
  onFieldChange,
  onIngredientChange,
  onAddIngredient,
  onRemoveIngredient,
}: RecipeFormFieldsProps) => (
  <>
    <Input
      id={`${prefix}-title`}
      label="Title"
      placeholder="e.g. Omelette"
      value={values.title}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onFieldChange('title', event.target.value)}
      error={Boolean(titleError)}
      helperText={titleError}
      fullWidth
    />
    <Input
      id={`${prefix}-description`}
      label="Description"
      placeholder="Short summary"
      value={values.description}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onFieldChange('description', event.target.value)}
      fullWidth
    />
    <Input
      id={`${prefix}-recipe`}
      label="Instructions"
      placeholder="Recipe instructions"
      value={values.recipe}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onFieldChange('recipe', event.target.value)}
      fullWidth
    />
    <Input
      id={`${prefix}-photo`}
      label="Photo URL"
      placeholder="https://..."
      value={values.photo}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onFieldChange('photo', event.target.value)}
      fullWidth
    />

    <SearchableSelect
      id={`${prefix}-category`}
      label="Category"
      value={values.categoryId}
      onValueChange={(nextValue) => onFieldChange('categoryId', nextValue)}
      options={[
        { value: '', label: 'No category' },
        ...categories.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      ]}
      disabled={isOptionsLoading}
    />

    <Divider spacing={40} />

    <Text as="p" variant="body-sm" weight="bold">
      Ingredients
    </Text>
    {values.ingredients.map((ingredient, index) => (
      <Box key={`${prefix}-ingredient-${index}`} display="grid" gap={1}>
        <SearchableSelect
          id={`${prefix}-ingredient-${index}-product`}
          label="Product"
          value={ingredient.productId}
          onValueChange={(nextValue) => onIngredientChange(index, 'productId', nextValue)}
          options={[
            { value: '', label: 'Select product' },
            ...products.map((product) => ({
              value: product.id,
              label: product.name,
            })),
          ]}
          disabled={isOptionsLoading}
        />
        <Input
          id={`${prefix}-ingredient-${index}-quantity`}
          type="number"
          label="Quantity"
          value={ingredient.quantity}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onIngredientChange(index, 'quantity', event.target.value)}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="button"
            variant="outline"
            intent="danger"
            disabled={values.ingredients.length === 1}
            onClick={() => onRemoveIngredient(index)}
          >
            Remove ingredient
          </Button>
        </Box>
      </Box>
    ))}

    <Box display="flex" justifyContent="flex-start">
      <Button type="button" variant="outline" onClick={onAddIngredient}>
        Add ingredient
      </Button>
    </Box>
  </>
);

export default RecipeFormFields;
