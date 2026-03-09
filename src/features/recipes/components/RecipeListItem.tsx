import { Box, Button, Card, CardContent, Input, Text } from 'tharaday';
import type { Category } from '../../categories/types.ts';
import type { Product } from '../../products/types.ts';
import type { RecipeFormValues } from '../helpers/recipeFormHelpers.ts';
import { getRecipeDescription, getRecipeMeta } from '../helpers/recipeHelpers.ts';
import type { Recipe } from '../types.ts';

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
            <Input
              id={`edit-recipe-title-${recipe.id}`}
              label="Title"
              value={editingValues.title}
              onChange={(event) => onChangeField('title', event.target.value)}
              fullWidth
            />
            <Input
              id={`edit-recipe-description-${recipe.id}`}
              label="Description"
              value={editingValues.description}
              onChange={(event) => onChangeField('description', event.target.value)}
              fullWidth
            />
            <Input
              id={`edit-recipe-text-${recipe.id}`}
              label="Instructions"
              value={editingValues.recipe}
              onChange={(event) => onChangeField('recipe', event.target.value)}
              fullWidth
            />
            <Input
              id={`edit-recipe-photo-${recipe.id}`}
              label="Photo URL"
              value={editingValues.photo}
              onChange={(event) => onChangeField('photo', event.target.value)}
              fullWidth
            />

            <label htmlFor={`edit-recipe-category-${recipe.id}`}>
              <Text as="span" variant="body-sm">
                Category
              </Text>
            </label>
            <select
              id={`edit-recipe-category-${recipe.id}`}
              value={editingValues.categoryId}
              onChange={(event) => onChangeField('categoryId', event.target.value)}
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

            {editingValues.ingredients.map((ingredient, index) => (
              <Box key={`${recipe.id}-${index}`} display="grid" gap={1}>
                <select
                  value={ingredient.productId}
                  onChange={(event) => onChangeIngredient(index, 'productId', event.target.value)}
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={String(product.id)}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <Input
                  id={`edit-recipe-${recipe.id}-ingredient-${index}-quantity`}
                  type="number"
                  label="Quantity"
                  value={ingredient.quantity}
                  onChange={(event) => onChangeIngredient(index, 'quantity', event.target.value)}
                  fullWidth
                />
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="button"
                    variant="outline"
                    intent="danger"
                    disabled={editingValues.ingredients.length === 1}
                    onClick={() => onRemoveIngredient(index)}
                  >
                    Remove ingredient
                  </Button>
                </Box>
              </Box>
            ))}

            <Box display="flex" justifyContent="space-between" gap={2}>
              <Button type="button" variant="outline" onClick={onAddIngredient}>
                Add ingredient
              </Button>
              <Box display="flex" gap={2}>
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
