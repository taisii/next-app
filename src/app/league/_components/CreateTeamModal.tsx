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
} from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { NameInput } from './NameInput';
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
  const [isNameEmptyLabelShown, setIsNameEmptyLabelShown] = useState(false);
  const [isNameExistLabelShown, setIsNameExistLabelShown] = useState(false);

  const handleOnClose = () => {
    setIsNameEmptyLabelShown(false);
    setIsNameExistLabelShown(false);
    setAddingTeam({ iconUriIndex: addingTeam.iconUriIndex, name: '' });
    onClose();
  };

  const handleOnClickIcon = () => {
    onCreateTeamClose();
    onSelectIconOpen();
  };

  const handleOnChengeText = (e: ChangeEvent<HTMLInputElement>) => {
    setAddingTeam({ iconUriIndex: addingTeam.iconUriIndex, name: e.target.value });
  };

  const handleClickDecideButton = () => {
    const isNameEmpty = addingTeam.name === '';
    const isNameExist = teamList.some((team) => team.name === addingTeam.name);
    setIsNameEmptyLabelShown(isNameEmpty);
    setIsNameExistLabelShown(isNameExist);
    if (!isNameEmpty && !isNameExist) {
      setTeamList([...teamList, addingTeam]);
      onCreateTeamClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
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
              objectFit="contain"
            />
          </Box>
          <NameInput
            isNameEmptyLabelShown={isNameEmptyLabelShown}
            isNameExistLabelShown={isNameExistLabelShown}
            value={addingTeam.name}
            onInputChange={handleOnChengeText}
          />
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
