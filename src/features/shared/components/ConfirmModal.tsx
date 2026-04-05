import { Box, Button, Modal, Text } from 'tharaday';

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  isOpen,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onCancel}
    title="Confirm action"
    footer={
      <Box display="flex" gap={2} justifyContent="flex-end" fullWidth>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button intent="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Box>
    }
  >
    <Text as="p" variant="body-md">
      {message}
    </Text>
  </Modal>
);

export default ConfirmModal;
