import type { Product } from '../../products/types.ts';
import type { Recipe, RecipePayload, RecipeProductPayload } from '../types.ts';

export type RecipeIngredientFormValue = {
  productId: string;
  quantity: string;
};

export type RecipeFormValues = {
  title: string;
  description: string;
  recipe: string;
  photo: string;
  categoryId: string;
  ingredients: RecipeIngredientFormValue[];
};

export const createEmptyRecipeFormValues = (): RecipeFormValues => ({
  title: '',
  description: '',
  recipe: '',
  photo: '',
  categoryId: '',
  ingredients: [{ productId: '', quantity: '1' }],
});

export const toRecipeFormValues = (recipe: Recipe): RecipeFormValues => ({
  title: recipe.name,
  description: recipe.description,
  recipe: recipe.recipe,
  photo: recipe.photo,
  categoryId: recipe.category ? String(recipe.category.id) : '',
  ingredients:
    recipe.products.length > 0
      ? recipe.products.map((product) => ({
          productId: String(product.id),
          quantity: String(product.quantity),
        }))
      : [{ productId: '', quantity: '1' }],
});

const parseIngredient = (ingredient: RecipeIngredientFormValue): RecipeProductPayload | null => {
  const productId = Number(ingredient.productId);
  const quantity = Number(ingredient.quantity);

  if (!Number.isInteger(productId) || productId <= 0) {
    return null;
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return null;
  }

  return { productId, quantity };
};

export const toRecipePayload = (values: RecipeFormValues): RecipePayload => {
  const products: RecipeProductPayload[] = values.ingredients
    .map((ingredient) => parseIngredient(ingredient))
    .filter((ingredient): ingredient is RecipeProductPayload => ingredient !== null);

  const categoryNumber = Number(values.categoryId);

  return {
    title: values.title,
    description: values.description.trim() || undefined,
    recipe: values.recipe,
    photo: values.photo.trim() || undefined,
    category: Number.isInteger(categoryNumber) && categoryNumber > 0 ? categoryNumber : undefined,
    products,
  };
};

export const defaultIngredientProductId = (products: Product[]): string => {
  if (products.length === 0) {
    return '';
  }

  return String(products[0].id);
};
