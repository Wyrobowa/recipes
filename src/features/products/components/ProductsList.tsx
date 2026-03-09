import { useState } from 'react';
import type { FormEventHandler } from 'react';
import { Box, Button, Loader, Modal, Notification, Text } from 'tharaday';
import type { Product } from '../types.ts';
import {
  createEmptyProductFormValues,
  toProductFormValues,
  toProductPayload,
  type ProductFormValues,
} from '../helpers/productFormHelpers.ts';
import ProductFormFields from './ProductFormFields.tsx';
import ProductListItem from './ProductListItem.tsx';
import { useProducts } from '../hooks/useProducts.ts';

type ProductsListProps = {
  isCreateModalOpen: boolean;
  onCloseCreateModal: () => void;
};

const ProductsList = ({ isCreateModalOpen, onCloseCreateModal }: ProductsListProps) => {
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
      onCloseCreateModal();
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

  const createFormId = 'create-product-form';

  return (
    <Box display="grid" gap={3}>
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

      <Modal
        isOpen={isCreateModalOpen}
        onClose={onCloseCreateModal}
        title="Add product"
        footer={
          <Box display="flex" gap={2} justifyContent="flex-end" fullWidth>
            <Button variant="outline" onClick={onCloseCreateModal}>
              Cancel
            </Button>
            <Button type="submit" form={createFormId} isLoading={isCreating} intent="info">
              Add product
            </Button>
          </Box>
        }
      >
        <Box as="form" id={createFormId} onSubmit={handleSubmit} display="grid" gap={2}>
          <ProductFormFields
            prefix="new-product"
            values={newProductValues}
            onChange={updateNewProductField}
            showError={Boolean(actionError)}
            errorMessage={actionError ?? undefined}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductsList;
