import { useState } from 'react';
import type { FormEventHandler } from 'react';
import { Box, Loader, Notification, Text } from 'tharaday';
import type { Product } from '../types.ts';
import {
  createEmptyProductFormValues,
  toProductFormValues,
  toProductPayload,
  type ProductFormValues,
} from '../helpers/productFormHelpers.ts';
import ProductCreateForm from './ProductCreateForm.tsx';
import ProductListItem from './ProductListItem.tsx';
import { useProducts } from '../hooks/useProducts.ts';

const ProductsList = () => {
  const {
    products,
    isLoading,
    error,
    isCreating,
    updatingProductId,
    deletingProductId,
    actionError,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [newProductValues, setNewProductValues] = useState<ProductFormValues>(
    createEmptyProductFormValues()
  );
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProductValues, setEditingProductValues] = useState<ProductFormValues>(
    createEmptyProductFormValues()
  );

  const updateNewProductField = (field: keyof ProductFormValues, value: string) => {
    setNewProductValues((current) => ({ ...current, [field]: value }));
  };

  const updateEditingField = (field: keyof ProductFormValues, value: string) => {
    setEditingProductValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();

    const created = await createProduct(toProductPayload(newProductValues));
    if (created) {
      setNewProductValues(createEmptyProductFormValues());
    }
  };

  const startEditing = (product: Product) => {
    setEditingProductId(String(product.id));
    setEditingProductValues(toProductFormValues(product));
  };

  const cancelEditing = () => {
    setEditingProductId(null);
    setEditingProductValues(createEmptyProductFormValues());
  };

  const handleSaveEdit = async (id: string | number) => {
    const updated = await updateProduct(id, toProductPayload(editingProductValues));
    if (updated) {
      cancelEditing();
    }
  };

  const handleDelete = async (id: string | number, name: string) => {
    const confirmed = window.confirm(`Delete product "${name}"?`);
    if (!confirmed) {
      return;
    }

    const deleted = await deleteProduct(id);
    if (deleted && editingProductId === String(id)) {
      cancelEditing();
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" gap={2} paddingY={2}>
        <Loader size="sm" intent="info" />
        <Text as="p" variant="body-md" color="subtle">
          Loading products...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Notification intent="danger" title="Could not load products">
        {error}
      </Notification>
    );
  }

  return (
    <Box display="grid" gap={3}>
      <ProductCreateForm
        values={newProductValues}
        actionError={actionError}
        isCreating={isCreating}
        onChange={updateNewProductField}
        onSubmit={handleSubmit}
      />

      {actionError ? (
        <Notification intent="danger" title="Product action failed">
          {actionError}
        </Notification>
      ) : null}

      {products.length === 0 ? (
        <Notification intent="neutral" title="No products found">
          Add your first product to get started.
        </Notification>
      ) : null}

      <Box as="ul" display="grid" gap={3} margin={0} padding={0} style={{ listStyle: 'none' }}>
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            isEditing={editingProductId === String(product.id)}
            editingValues={editingProductValues}
            isUpdating={updatingProductId === product.id}
            isDeleting={deletingProductId === product.id}
            onStartEditing={startEditing}
            onEditFieldChange={updateEditingField}
            onCancelEditing={cancelEditing}
            onSave={handleSaveEdit}
            onDelete={handleDelete}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductsList;
