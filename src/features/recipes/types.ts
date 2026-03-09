export type ApiRecipe = {
  id?: number | string;
  _id?: number | string;
  name?: string;
  title?: string;
  description?: string;
  instructions?: string;
  recipe?: string;
};

export type Recipe = {
  id: number | string;
  name: string;
  description: string;
};
