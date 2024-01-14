'use client';

import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import { deleteRecord } from '@/mutations/deleteRecord';

interface DeleteRecordButtonProps {
  id: number;
}

export const DeleteRecordButton: React.FC<DeleteRecordButtonProps> = ({ id }) => {
  return (
    <IconButton
      aria-label="delete record"
      icon={<DeleteIcon />}
      onClick={() => {
        deleteRecord(id);
      }}
    />
  );
};
