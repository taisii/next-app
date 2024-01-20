'use client';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonProps,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { deleteSession } from '../mutations/deleteSession';

interface DeleteSessionButtonProps extends ButtonProps {
  sessionId: number;
}

export const DeleteSessionButton: React.FC<DeleteSessionButtonProps> = ({ sessionId, ...Props }) => {
  const [isDeleteing, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <>
      <IconButton
        aria-label="delete session"
        icon={<DeleteIcon />}
        onClick={onOpen}
        isLoading={isDeleteing}
        {...Props}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>削除の確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>この操作は元に戻せません。本当に削除しますか？</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme="red"
              isLoading={isDeleteing}
              onClick={async () => {
                setIsDeleting(true);
                await deleteSession(sessionId);
                router.refresh();
                onClose();
                setIsDeleting(false);
              }}
            >
              削除
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
