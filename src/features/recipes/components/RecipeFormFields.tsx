import { Box, Button, Input, Text } from 'tharaday';
import type { Category } from '../../categories/types.ts';
import type { Product } from '../../products/types.ts';
import type { RecipeFormValues } from '../helpers/recipeFormHelpers.ts';

type RecipeFormFieldsProps = {
  prefix: string;
  values: RecipeFormValues;
  categories: Category[];
  products: Product[];
  titleError?: string;
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
      onChange={(event) => onFieldChange('title', event.target.value)}
      error={Boolean(titleError)}
      helperText={titleError}
      fullWidth
    />
    <Input
      id={`${prefix}-description`}
      label="Description"
      placeholder="Short summary"
      value={values.description}
      onChange={(event) => onFieldChange('description', event.target.value)}
      fullWidth
    />
    <Input
      id={`${prefix}-recipe`}
      label="Instructions"
      placeholder="Recipe instructions"
      value={values.recipe}
      onChange={(event) => onFieldChange('recipe', event.target.value)}
      fullWidth
    />
    <Input
      id={`${prefix}-photo`}
      label="Photo URL"
      placeholder="https://..."
      value={values.photo}
      onChange={(event) => onFieldChange('photo', event.target.value)}
      fullWidth
    />

    <label htmlFor={`${prefix}-category`}>
      <Text as="span" variant="body-sm">
        Category
      </Text>
    </label>
    <select
      id={`${prefix}-category`}
      value={values.categoryId}
      onChange={(event) => onFieldChange('categoryId', event.target.value)}
    >
      <option value="">No category</option>
      {categories.map((category) => (
        <option key={category.id} value={String(category.id)}>
          {category.name}
        </option>
      ))}
    </select>

    <Text as="p" variant="body-sm" weight="bold">
      Ingredients
    </Text>
    {values.ingredients.map((ingredient, index) => (
      <Box key={`${prefix}-ingredient-${index}`} display="grid" gap={1}>
        <select
          value={ingredient.productId}
          onChange={(event) => onIngredientChange(index, 'productId', event.target.value)}
        >
          <option value="">Select product</option>
          {products.map((product) => (
            <option key={product.id} value={String(product.id)}>
              {product.name}
            </option>
          ))}
        </select>
        <Input
          id={`${prefix}-ingredient-${index}-quantity`}
          type="number"
          label="Quantity"
          value={ingredient.quantity}
          onChange={(event) => onIngredientChange(index, 'quantity', event.target.value)}
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
