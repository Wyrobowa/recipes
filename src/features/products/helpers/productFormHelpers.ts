import type { Product, ProductPayload } from '../types.ts';

export type ProductFormValues = {
  name: string;
  unit: string;
  protein_g: string;
  carbs_g: string;
  fat_g: string;
};

export const createEmptyProductFormValues = (): ProductFormValues => ({
  name: '',
  unit: '',
  protein_g: '',
  carbs_g: '',
  fat_g: '',
});

export const toProductPayload = (values: ProductFormValues): ProductPayload => ({
  name: values.name,
  unit: values.unit,
  protein_g: Number(values.protein_g),
  carbs_g: Number(values.carbs_g),
  fat_g: Number(values.fat_g),
});

export const toProductFormValues = (product: Product): ProductFormValues => ({
  name: product.name,
  unit: product.unit,
  protein_g: String(product.protein_g),
  carbs_g: String(product.carbs_g),
  fat_g: String(product.fat_g),
});
