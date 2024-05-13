import {
  Box,
  Button,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { teamIconUriList } from '../_constants/Constants';
import { AddingTeam } from '../page';

type CreateTeamModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeamClose: () => void;
  onSelectIconOpen: () => void;
  addingTeam: AddingTeam;
  setAddingTeam: Dispatch<SetStateAction<AddingTeam>>;
  teamList: AddingTeam[];
  setTeamList: Dispatch<SetStateAction<AddingTeam[]>>;
};

export const CreateTeamModal = ({
  isOpen,
  onClose,
  onCreateTeamClose,
  onSelectIconOpen,
  addingTeam,
  setAddingTeam,
  teamList,
  setTeamList,
}: CreateTeamModalProps) => {
  const handleOnClickIcon = () => {
    onCreateTeamClose();
    onSelectIconOpen();
  };

  const handleOnChengeText = (e: ChangeEvent<HTMLInputElement>) => {
    setAddingTeam({ iconUriIndex: addingTeam.iconUriIndex, name: e.target.value });
  };

  const handleClickDecideButton = () => {
    if (addingTeam) {
      setTeamList([...teamList, addingTeam]);
    }
    onCreateTeamClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="90%">
        <ModalHeader fontWeight="bold">Create Team</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box onClick={handleOnClickIcon} display="flex" justifyContent="center" pb="3rem">
            <Img
              src={teamIconUriList[addingTeam.iconUriIndex]}
              borderWidth={1}
              borderColor="black"
              width="100%"
              objectFit="cover"
            />
          </Box>
          <Input placeholder="Team Name" value={addingTeam.name} onChange={handleOnChengeText} />
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClickDecideButton}>
            決定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
