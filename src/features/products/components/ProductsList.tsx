import { useState } from 'react';
import type { FormEventHandler } from 'react';
import { Box, Button, Card, CardContent, Input, Loader, Notification, Text } from 'tharaday';
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
  const [newProductName, setNewProductName] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProductName, setEditingProductName] = useState('');

  const handleSubmit: FormEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();

    const created = await createProduct(newProductName);
    if (created) {
      setNewProductName('');
    }
  };

  const startEditing = (id: string | number, currentName: string) => {
    setEditingProductId(String(id));
    setEditingProductName(currentName);
  };

  const cancelEditing = () => {
    setEditingProductId(null);
    setEditingProductName('');
  };

  const handleSaveEdit = async (id: string | number) => {
    const updated = await updateProduct(id, editingProductName);
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
      <Box as="form" onSubmit={handleSubmit} display="grid" gap={2}>
        <Input
          id="new-product-name"
          label="Product name"
          placeholder="e.g. Tomato"
          value={newProductName}
          onChange={(event) => setNewProductName(event.target.value)}
          error={Boolean(actionError)}
          helperText={actionError ?? undefined}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" isLoading={isCreating} intent="info">
            Add product
          </Button>
        </Box>
      </Box>

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
          <Box as="li" key={product.id}>
            <Card bordered>
              <CardContent>
                {editingProductId === String(product.id) ? (
                  <Box display="grid" gap={2}>
                    <Input
                      id={`edit-product-${product.id}`}
                      label="Product name"
                      value={editingProductName}
                      onChange={(event) => setEditingProductName(event.target.value)}
                      fullWidth
                    />
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                      <Button variant="outline" onClick={cancelEditing}>
                        Cancel
                      </Button>
                      <Button
                        intent="info"
                        isLoading={updatingProductId === product.id}
                        onClick={() => handleSaveEdit(product.id)}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Text as="h3" variant="h6" marginBottom={1}>
                      {product.name}
                    </Text>
                    {product.slug ? (
                      <Text as="p" variant="body-sm" color="subtle">
                        /{product.slug}
                      </Text>
                    ) : null}
                    <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
                      <Button
                        variant="outline"
                        onClick={() => startEditing(product.id, product.name)}
                      >
                        Edit
                      </Button>
                      <Button
                        intent="danger"
                        variant="outline"
                        isLoading={deletingProductId === product.id}
                        onClick={() => handleDelete(product.id, product.name)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductsList;
