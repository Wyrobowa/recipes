import { Box, Button, Card, CardContent, Text } from 'tharaday';
import type { Category } from '../../categories/types.ts';
import type { Product } from '../../products/types.ts';
import type { RecipeFormValues } from '../helpers/recipeFormHelpers.ts';
import { getRecipeDescription, getRecipeMeta } from '../helpers/recipeHelpers.ts';
import type { Recipe } from '../types.ts';
import RecipeFormFields from './RecipeFormFields.tsx';

type RecipeListItemProps = {
  recipe: Recipe;
  categories: Category[];
  products: Product[];
  isEditing: boolean;
  editingValues: RecipeFormValues;
  isUpdating: boolean;
  isDeleting: boolean;
  onStartEditing: (recipe: Recipe) => void;
  onChangeField: (field: Exclude<keyof RecipeFormValues, 'ingredients'>, value: string) => void;
  onChangeIngredient: (index: number, field: 'productId' | 'quantity', value: string) => void;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
  onCancelEditing: () => void;
  onSave: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
};

const RecipeListItem = ({
  recipe,
  categories,
  products,
  isEditing,
  editingValues,
  isUpdating,
  isDeleting,
  onStartEditing,
  onChangeField,
  onChangeIngredient,
  onAddIngredient,
  onRemoveIngredient,
  onCancelEditing,
  onSave,
  onDelete,
}: RecipeListItemProps) => (
  <Box as="li">
    <Card bordered>
      <CardContent>
        {isEditing ? (
          <Box display="grid" gap={2}>
            <RecipeFormFields
              prefix={`edit-recipe-${recipe.id}`}
              values={editingValues}
              categories={categories}
              products={products}
              onFieldChange={onChangeField}
              onIngredientChange={onChangeIngredient}
              onAddIngredient={onAddIngredient}
              onRemoveIngredient={onRemoveIngredient}
            />

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button type="button" variant="outline" onClick={onCancelEditing}>
                Cancel
              </Button>
              <Button
                type="button"
                intent="info"
                isLoading={isUpdating}
                onClick={() => onSave(recipe)}
              >
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Text as="h3" variant="h6" marginBottom={1}>
              {recipe.name}
            </Text>
            <Text as="p" variant="body-sm" color="subtle" marginBottom={1}>
              {getRecipeMeta(recipe)}
            </Text>
            <Text as="p" variant="body-md" color="subtle">
              {getRecipeDescription(recipe)}
            </Text>
            <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
              <Button type="button" variant="outline" onClick={() => onStartEditing(recipe)}>
                Edit
              </Button>
              <Button
                type="button"
                intent="danger"
                variant="outline"
                isLoading={isDeleting}
                onClick={() => onDelete(recipe)}
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

export default RecipeListItem;
