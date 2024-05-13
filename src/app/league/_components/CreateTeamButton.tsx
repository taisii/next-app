import { Button, useDisclosure } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import { CreateTeamModal } from './CreateTeamModal';
import { SelectIconModal } from './SeclectIconModal';
import { teamIconUriList } from '../_constants/Constants';
import { AddingTeam } from '../page';

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

  return (
    <>
      <Button variant="outline" width="100%" onClick={onCreateTeamOpen}>
        Create Team
      </Button>

      <CreateTeamModal
        isOpen={isCreateTeamOpen}
        onClose={onCreateTeamClose}
        onSelectIconOpen={onSelectIconOpen}
        onCreateTeamClose={onCreateTeamClose}
        teamList={teamList}
        addingTeam={addingTeam}
        setAddingTeam={setAddingTeam}
        setTeamList={setTeamList}
      />

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
