import {
  Box,
  Button,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { teamIconUriList } from './UserCard';
import { AddingTeam } from '../page';

type CreateTeamButtonProps = {
  addingTeamList: AddingTeam[];
  setAddingTeamList: Dispatch<SetStateAction<AddingTeam[]>>;
};

export const CreateTeamButton = ({ addingTeamList, setAddingTeamList }: CreateTeamButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" width="100%" onClick={onOpen}>
        Create Team
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="90%">
          <ModalHeader fontWeight="bold">Select Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflowY="scroll" height="20rem">
              {teamIconUriList.map((teamIconUri) => (
                <Img src={teamIconUri} key={teamIconUri} boxSize="4rem" />
              ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline">決定</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
