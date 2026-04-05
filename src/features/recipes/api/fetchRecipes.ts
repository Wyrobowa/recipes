import { API_BASE_URL } from '../../../app/config/env.ts';
import { getApiDataArray, throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';
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
  category: string | ApiRecipeCategory | null | undefined
): RecipeCategory | null => {
  if (!category || typeof category === 'string') {
    return null;
  }

  const rawId = category.id ?? category._id;
  if (rawId == null) {
    console.warn('Recipe category missing id, using generated UUID', category);
  }
  return {
    id: rawId != null ? String(rawId) : crypto.randomUUID(),
    name: category.name ?? 'Uncategorized',
    slug: category.slug ?? '',
  };
};

const normalizeRecipeProduct = (item: ApiRecipeProduct): RecipeProduct | null => {
  if (!item.product) {
    return null;
  }

  const rawId = item.product.id ?? item.product._id;
  if (rawId == null) {
    console.warn('Recipe product missing id, using generated UUID', item.product);
  }
  return {
    id: rawId != null ? String(rawId) : crypto.randomUUID(),
    name: item.product.name ?? 'Unnamed product',
    unit: item.product.unit ?? '',
    quantity: toNumber(item.quantity),
    kcal: toNumber(item.product.kcal),
    protein_g: toNumber(item.product.protein_g),
    carbs_g: toNumber(item.product.carbs_g),
    fat_g: toNumber(item.product.fat_g),
  };
};

const normalizeRecipe = (recipe: ApiRecipe): Recipe => {
  const rawId = recipe.id ?? recipe._id;
  if (rawId == null) {
    console.warn('Recipe missing id, using generated UUID', recipe);
  }
  return {
    id: rawId != null ? String(rawId) : crypto.randomUUID(),
    slug: recipe.slug ?? '',
    name: recipe.title ?? recipe.name ?? 'Untitled recipe',
    description: recipe.description ?? recipe.instructions ?? recipe.recipe ?? '',
    recipe: recipe.recipe ?? recipe.instructions ?? '',
    photo: 'photo' in recipe && typeof recipe.photo === 'string' ? recipe.photo : '',
    category: normalizeCategory(recipe.category),
    products: (recipe.products ?? [])
      .map((item) => normalizeRecipeProduct(item))
      .filter((item): item is RecipeProduct => item !== null),
  };
};

export const fetchRecipes = async (signal?: AbortSignal): Promise<Recipe[]> => {
  const response = await fetch(`${API_BASE_URL}/recipes`, { signal });
  await throwIfResponseNotOk(response, 'fetch recipes');

  const payload: unknown = await response.json();
  const data = getApiDataArray(payload);

  if (!data) {
    throw new Error('Invalid recipes response');
  }

  return data.map((item) => normalizeRecipe(item as ApiRecipe));
};
