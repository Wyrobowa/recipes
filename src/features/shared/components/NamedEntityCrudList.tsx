import { useState } from 'react';
import type { ChangeEvent, FormEventHandler } from 'react';
import { Box, Button, Card, CardContent, Input, Loader, Modal, Notification, Text } from 'tharaday';
import ConfirmModal from './ConfirmModal.tsx';

export type NamedEntity = {
  id: string;
  name: string;
  slug?: string;
};

type NamedEntityCrudListProps<TItem extends NamedEntity> = {
  items: TItem[];
  singularLabel: string;
  pluralLabel: string;
  inputId: string;
  inputPlaceholder: string;
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;
  updatingItemId: TItem['id'] | null;
  deletingItemId: TItem['id'] | null;
  actionError: string | null;
  onCreate: (name: string) => Promise<boolean>;
  onUpdate: (id: TItem['id'], name: string) => Promise<boolean>;
  onDelete: (id: TItem['id']) => Promise<boolean>;
  isCreateModalOpen: boolean;
  onCloseCreateModal: () => void;
};

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

const NamedEntityCrudList = <TItem extends NamedEntity>({
  items,
  singularLabel,
  pluralLabel,
  inputId,
  inputPlaceholder,
  isLoading,
  error,
  isCreating,
  updatingItemId,
  deletingItemId,
  actionError,
  onCreate,
  onUpdate,
  onDelete,
  isCreateModalOpen,
  onCloseCreateModal,
}: NamedEntityCrudListProps<TItem>) => {
  const [newItemName, setNewItemName] = useState('');
  const [editingItemId, setEditingItemId] = useState<TItem['id'] | null>(null);
  const [editingItemName, setEditingItemName] = useState('');
  const [pendingDelete, setPendingDelete] = useState<{ id: TItem['id']; name: string } | null>(
    null
  );

  const handleSubmit: FormEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();

    const created = await onCreate(newItemName);
    if (created) {
      setNewItemName('');
      onCloseCreateModal();
    }
  };

  const startEditing = (id: TItem['id'], currentName: string) => {
    setEditingItemId(id);
    setEditingItemName(currentName);
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setEditingItemName('');
  };

  const handleSaveEdit = async (id: TItem['id']) => {
    const updated = await onUpdate(id, editingItemName);
    if (updated) {
      cancelEditing();
    }
  };

  const handleDelete = (id: TItem['id'], name: string) => {
    setPendingDelete({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const { id } = pendingDelete;
    setPendingDelete(null);

    const deleted = await onDelete(id);
    if (deleted && editingItemId === id) {
      cancelEditing();
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" gap={2} paddingY={2}>
        <Loader size="sm" intent="info" />
        <Text as="p" variant="body-md" color="subtle">
          Loading {pluralLabel}...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Notification intent="danger" title={`Could not load ${pluralLabel}`}>
        {error}
      </Notification>
    );
  }

  const singularTitle = capitalize(singularLabel);
  const createFormId = `create-${singularLabel}-form`;

  return (
    <Box display="grid" gap={3}>
      {actionError ? (
        <Notification intent="danger" title={`${singularTitle} action failed`}>
          {actionError}
        </Notification>
      ) : null}

      {items.length === 0 ? (
        <Notification intent="neutral" title={`No ${pluralLabel} found`}>
          Add your first {singularLabel} to get started.
        </Notification>
      ) : null}

      <Box as="ul" display="grid" gap={3} margin={0} padding={0} style={{ listStyle: 'none' }}>
        {items.map((item) => (
          <Box as="li" key={item.id}>
            <Card bordered>
              <CardContent>
                {editingItemId === item.id ? (
                  <Box display="grid" gap={2}>
                    <Input
                      id={`edit-${singularLabel}-${item.id}`}
                      label={`${singularTitle} name`}
                      value={editingItemName}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setEditingItemName(event.target.value)}
                      fullWidth
                    />
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                      <Button variant="outline" onClick={cancelEditing}>
                        Cancel
                      </Button>
                      <Button
                        intent="info"
                        isLoading={updatingItemId === item.id}
                        onClick={() => handleSaveEdit(item.id)}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Text as="h3" variant="h6" marginBottom={1}>
                      {item.name}
                    </Text>
                    {item.slug ? (
                      <Text as="p" variant="body-sm" color="subtle">
                        /{item.slug}
                      </Text>
                    ) : null}
                    <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
                      <Button variant="outline" onClick={() => startEditing(item.id, item.name)}>
                        Edit
                      </Button>
                      <Button
                        intent="danger"
                        variant="outline"
                        isLoading={deletingItemId === item.id}
                        onClick={() => handleDelete(item.id, item.name)}
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

      <ConfirmModal
        isOpen={pendingDelete !== null}
        message={`Delete ${singularLabel} "${pendingDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={onCloseCreateModal}
        title={`Add ${singularLabel}`}
        footer={
          <Box display="flex" gap={2} justifyContent="flex-end" fullWidth>
            <Button variant="outline" onClick={onCloseCreateModal}>
              Cancel
            </Button>
            <Button type="submit" form={createFormId} isLoading={isCreating} intent="info">
              Add {singularLabel}
            </Button>
          </Box>
        }
      >
        <Box as="form" id={createFormId} onSubmit={handleSubmit} display="grid" gap={2}>
          <Input
            id={inputId}
            label={`${singularTitle} name`}
            placeholder={inputPlaceholder}
            value={newItemName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setNewItemName(event.target.value)}
            error={Boolean(actionError)}
            helperText={actionError ?? undefined}
            fullWidth
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default NamedEntityCrudList;
