export type ApiProduct = {
  id?: number | string;
  _id?: number | string;
  name?: string;
  title?: string;
  unit?: string;
  protein_g?: number | string;
  carbs_g?: number | string;
  fat_g?: number | string;
};

export type Product = {
  id: number | string;
  name: string;
  unit: string;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
};

export type ProductPayload = {
  name: string;
  unit: string;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
};
