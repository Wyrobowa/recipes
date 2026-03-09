import { useCallback, useState } from 'react';
import type { Product } from '../../products/types.ts';
import {
  createEmptyRecipeFormValues,
  defaultIngredientProductId,
  toRecipeFormValues,
  type RecipeFormValues,
} from '../helpers/recipeFormHelpers.ts';
import type { Recipe } from '../types.ts';

type UseRecipeFormState = {
  newRecipeValues: RecipeFormValues;
  editingRecipeId: string | null;
  editingRecipeValues: RecipeFormValues;
  updateNewRecipeField: (field: Exclude<keyof RecipeFormValues, 'ingredients'>, value: string) => void;
  updateEditingField: (field: Exclude<keyof RecipeFormValues, 'ingredients'>, value: string) => void;
  updateNewIngredient: (index: number, field: 'productId' | 'quantity', value: string) => void;
  updateEditingIngredient: (index: number, field: 'productId' | 'quantity', value: string) => void;
  addNewIngredient: (products: Product[]) => void;
  addEditingIngredient: (products: Product[]) => void;
  removeNewIngredient: (index: number) => void;
  removeEditingIngredient: (index: number) => void;
  syncNewRecipeDefaultProduct: (products: Product[]) => void;
  resetNewRecipeValues: (products: Product[]) => void;
  startEditing: (recipe: Recipe) => void;
  cancelEditing: () => void;
};

const updateIngredient = (
  values: RecipeFormValues,
  index: number,
  field: 'productId' | 'quantity',
  value: string
): RecipeFormValues => ({
  ...values,
  ingredients: values.ingredients.map((ingredient, ingredientIndex) =>
    ingredientIndex === index ? { ...ingredient, [field]: value } : ingredient
  ),
});

const removeIngredient = (values: RecipeFormValues, index: number): RecipeFormValues => {
  if (values.ingredients.length === 1) {
    return values;
  }

  return {
    ...values,
    ingredients: values.ingredients.filter((_, ingredientIndex) => ingredientIndex !== index),
  };
};

const nextIngredient = (products: Product[]) => ({
  productId: defaultIngredientProductId(products),
  quantity: '1',
});

export const useRecipeFormState = (): UseRecipeFormState => {
  const [newRecipeValues, setNewRecipeValues] = useState<RecipeFormValues>(
    createEmptyRecipeFormValues()
  );
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);
  const [editingRecipeValues, setEditingRecipeValues] = useState<RecipeFormValues>(
    createEmptyRecipeFormValues()
  );

  const updateNewRecipeField = (
    field: Exclude<keyof RecipeFormValues, 'ingredients'>,
    value: string
  ) => {
    setNewRecipeValues((current) => ({ ...current, [field]: value }));
  };

  const updateEditingField = (
    field: Exclude<keyof RecipeFormValues, 'ingredients'>,
    value: string
  ) => {
    setEditingRecipeValues((current) => ({ ...current, [field]: value }));
  };

  const updateNewIngredient = (index: number, field: 'productId' | 'quantity', value: string) => {
    setNewRecipeValues((current) => updateIngredient(current, index, field, value));
  };

  const updateEditingIngredient = (
    index: number,
    field: 'productId' | 'quantity',
    value: string
  ) => {
    setEditingRecipeValues((current) => updateIngredient(current, index, field, value));
  };

  const addNewIngredient = (products: Product[]) => {
    setNewRecipeValues((current) => ({
      ...current,
      ingredients: [...current.ingredients, nextIngredient(products)],
    }));
  };

  const addEditingIngredient = (products: Product[]) => {
    setEditingRecipeValues((current) => ({
      ...current,
      ingredients: [...current.ingredients, nextIngredient(products)],
    }));
  };

  const removeNewIngredient = (index: number) => {
    setNewRecipeValues((current) => removeIngredient(current, index));
  };

  const removeEditingIngredient = (index: number) => {
    setEditingRecipeValues((current) => removeIngredient(current, index));
  };

  const syncNewRecipeDefaultProduct = useCallback((products: Product[]) => {
    setNewRecipeValues((current) => {
      if (current.ingredients[0]?.productId || products.length === 0) {
        return current;
      }

      return {
        ...current,
        ingredients: [
          {
            productId: defaultIngredientProductId(products),
            quantity: current.ingredients[0]?.quantity ?? '1',
          },
        ],
      };
    });
  }, []);

  const resetNewRecipeValues = (products: Product[]) => {
    setNewRecipeValues({
      ...createEmptyRecipeFormValues(),
      ingredients: [nextIngredient(products)],
    });
  };

  const startEditing = (recipe: Recipe) => {
    setEditingRecipeId(String(recipe.id));
    setEditingRecipeValues(toRecipeFormValues(recipe));
  };

  const cancelEditing = () => {
    setEditingRecipeId(null);
    setEditingRecipeValues(createEmptyRecipeFormValues());
  };

  return {
    newRecipeValues,
    editingRecipeId,
    editingRecipeValues,
    updateNewRecipeField,
    updateEditingField,
    updateNewIngredient,
    updateEditingIngredient,
    addNewIngredient,
    addEditingIngredient,
    removeNewIngredient,
    removeEditingIngredient,
    syncNewRecipeDefaultProduct,
    resetNewRecipeValues,
    startEditing,
    cancelEditing,
  };
};
