import { API_BASE_URL } from '../../../app/config/env.ts';
import type {
  ApiRecipe,
  ApiRecipeCategory,
  ApiRecipeProduct,
  Recipe,
  RecipeCategory,
  RecipeProduct,
} from '../types.ts';

const toNumber = (value: number | string | undefined): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeCategory = (
  category: string | ApiRecipeCategory | null | undefined,
): RecipeCategory | null => {
  if (!category || typeof category === 'string') {
    return null;
  }

  return {
    id: category.id ?? category._id ?? crypto.randomUUID(),
    name: category.name ?? 'Uncategorized',
    slug: category.slug ?? '',
  };
};

const normalizeRecipeProduct = (item: ApiRecipeProduct): RecipeProduct | null => {
  if (!item.product) {
    return null;
  }

  return {
    id: item.product.id ?? item.product._id ?? crypto.randomUUID(),
    name: item.product.name ?? 'Unnamed product',
    unit: item.product.unit ?? '',
    quantity: toNumber(item.quantity),
    kcal: toNumber(item.product.kcal),
  };
};

const normalizeRecipe = (recipe: ApiRecipe): Recipe => ({
  id: recipe.id ?? recipe._id ?? crypto.randomUUID(),
  slug: recipe.slug ?? '',
  name: recipe.title ?? recipe.name ?? 'Untitled recipe',
  description: recipe.description ?? recipe.instructions ?? recipe.recipe ?? '',
  recipe: recipe.recipe ?? recipe.instructions ?? '',
  photo: 'photo' in recipe && typeof recipe.photo === 'string' ? recipe.photo : '',
  category: normalizeCategory(recipe.category),
  products: (recipe.products ?? [])
    .map((item) => normalizeRecipeProduct(item))
    .filter((item): item is RecipeProduct => item !== null),
});

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_BASE_URL}/recipes`);

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes (${response.status})`);
  }

  const payload: unknown = await response.json();
  const data = Array.isArray(payload)
    ? payload
    : typeof payload === 'object' &&
        payload !== null &&
        'data' in payload &&
        Array.isArray((payload as { data: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : null;

  if (!data) {
    throw new Error('Invalid recipes response');
  }

  return data.map((item) => normalizeRecipe(item as ApiRecipe));
};
