import { useState } from 'react';
import type { FormEventHandler } from 'react';
import { Box, Button, Card, CardContent, Input, Loader, Notification, Text } from 'tharaday';
import { useCategories } from '../hooks/useCategories.ts';

const CategoriesList = () => {
  const {
    categories,
    isLoading,
    error,
    isCreating,
    updatingCategoryId,
    deletingCategoryId,
    actionError,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const handleSubmit: FormEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();

    const created = await createCategory(newCategoryName);
    if (created) {
      setNewCategoryName('');
    }
  };

  const startEditing = (id: string | number, currentName: string) => {
    setEditingCategoryId(String(id));
    setEditingCategoryName(currentName);
  };

  const cancelEditing = () => {
    setEditingCategoryId(null);
    setEditingCategoryName('');
  };

  const handleSaveEdit = async (id: string | number) => {
    const updated = await updateCategory(id, editingCategoryName);
    if (updated) {
      cancelEditing();
    }
  };

  const handleDelete = async (id: string | number, name: string) => {
    const confirmed = window.confirm(`Delete category "${name}"?`);
    if (!confirmed) {
      return;
    }

    const deleted = await deleteCategory(id);
    if (deleted && editingCategoryId === String(id)) {
      cancelEditing();
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" gap={2} paddingY={2}>
        <Loader size="sm" intent="info" />
        <Text as="p" variant="body-md" color="subtle">
          Loading categories...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Notification intent="danger" title="Could not load categories">
        {error}
      </Notification>
    );
  }

  return (
    <Box display="grid" gap={3}>
      <Box as="form" onSubmit={handleSubmit} display="grid" gap={2}>
        <Input
          id="new-category-name"
          label="Category name"
          placeholder="e.g. Dinner"
          value={newCategoryName}
          onChange={(event) => setNewCategoryName(event.target.value)}
          error={Boolean(actionError)}
          helperText={actionError ?? undefined}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" isLoading={isCreating} intent="info">
            Add category
          </Button>
        </Box>
      </Box>

      {actionError ? (
        <Notification intent="danger" title="Category action failed">
          {actionError}
        </Notification>
      ) : null}

      {categories.length === 0 ? (
        <Notification intent="neutral" title="No categories found">
          Add your first category to get started.
        </Notification>
      ) : null}

      <Box as="ul" display="grid" gap={3} margin={0} padding={0} style={{ listStyle: 'none' }}>
        {categories.map((category) => (
          <Box as="li" key={category.id}>
            <Card bordered>
              <CardContent>
                {editingCategoryId === String(category.id) ? (
                  <Box display="grid" gap={2}>
                    <Input
                      id={`edit-category-${category.id}`}
                      label="Category name"
                      value={editingCategoryName}
                      onChange={(event) => setEditingCategoryName(event.target.value)}
                      fullWidth
                    />
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                      <Button variant="outline" onClick={cancelEditing}>
                        Cancel
                      </Button>
                      <Button
                        intent="info"
                        isLoading={updatingCategoryId === category.id}
                        onClick={() => handleSaveEdit(category.id)}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Text as="h3" variant="h6" marginBottom={1}>
                      {category.name}
                    </Text>
                    {category.slug ? (
                      <Text as="p" variant="body-sm" color="subtle">
                        /{category.slug}
                      </Text>
                    ) : null}
                    <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
                      <Button
                        variant="outline"
                        onClick={() => startEditing(category.id, category.name)}
                      >
                        Edit
                      </Button>
                      <Button
                        intent="danger"
                        variant="outline"
                        isLoading={deletingCategoryId === category.id}
                        onClick={() => handleDelete(category.id, category.name)}
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

export default CategoriesList;
