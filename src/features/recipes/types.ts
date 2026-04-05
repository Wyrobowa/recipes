export type ApiRecipeCategory = {
  id?: number | string;
  _id?: number | string;
  name?: string;
  slug?: string;
};

export type ApiRecipeProduct = {
  quantity?: number | string;
  product?: {
    id?: number | string;
    _id?: number | string;
    name?: string;
    unit?: string;
    kcal?: number | string;
    protein_g?: number | string;
    carbs_g?: number | string;
    fat_g?: number | string;
  };
};

export type ApiRecipe = {
  id?: number | string;
  _id?: number | string;
  slug?: string;
  name?: string;
  title?: string;
  description?: string;
  instructions?: string;
  recipe?: string;
  photo?: string;
  category?: string | ApiRecipeCategory | null;
  products?: ApiRecipeProduct[];
};

export type RecipeCategory = {
  id: string;
  name: string;
  slug: string;
};

export type RecipeProduct = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
};

export type Recipe = {
  id: string;
  slug: string;
  name: string;
  description: string;
  recipe: string;
  photo: string;
  category: RecipeCategory | null;
  products: RecipeProduct[];
};

export type RecipeProductPayload = {
  productId: number;
  quantity: number;
};

export type RecipePayload = {
  title: string;
  description?: string;
  recipe: string;
  photo?: string;
  category?: number | null;
  products: RecipeProductPayload[];
};
