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
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { teamIconUriList } from '../_constants/Constants';
import { AddingTeam } from '../page';
import { SelectIconModal } from './SeclectIconModal';

type CreateTeamButtonProps = {
  teamList: AddingTeam[];
  setTeamList: Dispatch<SetStateAction<AddingTeam[]>>;
};

export const CreateTeamButton = ({ teamList, setTeamList }: CreateTeamButtonProps) => {
  const availableIndexList = teamListToavailableIndexList(teamList);

  const { isOpen: isCreateTeamOpen, onOpen: onCreateTeamOpen, onClose: onCreateTeamClose } = useDisclosure();
  const { isOpen: isSelectIconOpen, onOpen: onSelectIconOpen, onClose: onSelectIconClose } = useDisclosure();
  const [addingTeam, setAddingTeam] = useState<AddingTeam>({ iconUriIndex: availableIndexList[0], name: '' });
  const [selectIndex, setSelectIndex] = useState(availableIndexList[0]);

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
    <>
      <Button variant="outline" width="100%" onClick={onCreateTeamOpen}>
        Create Team
      </Button>

      <Modal isOpen={isCreateTeamOpen} onClose={onCreateTeamClose}>
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
            <Button onClick={handleClickDecideButton}>決定</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SelectIconModal
        isOpen={isSelectIconOpen}
        onClose={onSelectIconClose}
        onOpenCreateTeam={onCreateTeamOpen}
        availableIndexList={availableIndexList}
        selectedIndex={addingTeam.iconUriIndex}
        addingTeam={addingTeam}
        setAddingTeam={setAddingTeam}
      />
    </>
  );
};

const teamListToavailableIndexList = (teamList: AddingTeam[]) => {
  // 全インデックスの範囲を定義
  const totalIndexList = Array.from({ length: teamIconUriList.length }, (_, index) => index);

  // 使用されていないインデックスのリストを計算
  const availableIndexList = totalIndexList.filter((index) => !teamList.some((team) => team.iconUriIndex === index));

  return availableIndexList;
};
