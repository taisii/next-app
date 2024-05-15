import { DeleteIcon } from '@chakra-ui/icons';
import { Avatar, Flex, Icon, IconButton, Img, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import { SelectTeamModal } from './SelectTeamModal';
import { teamIconUriList } from '../_constants/Constants';
import { AddingTeam, AddingUser } from '../page';

type UserCardProps = {
  addingUser: AddingUser;
  userList: AddingUser[];
  setUserList: Dispatch<SetStateAction<AddingUser[]>>;
  teamList: AddingTeam[];
};

export const UserCard = ({ addingUser, userList, setUserList, teamList }: UserCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnDeleteButton = () => {
    setUserList(userList.filter((user) => user.userName !== addingUser.userName));
  };

  return (
    <>
      <Flex flexDir="row" alignItems="center" pt={2}>
        {addingUser.teamIndex !== undefined ? (
          <Avatar
            icon={<Img src={teamIconUriList[teamList[addingUser.teamIndex].iconUriIndex]} boxSize="3rem" />}
            onClick={onOpen}
            objectFit="contain"
            bgColor="transparent"
          />
        ) : (
          <Avatar
            icon={<Icon as={AiOutlineUser} boxSize="2rem" color="black" />}
            bgColor="transparent"
            onClick={onOpen}
          />
        )}

        <Text ml={5}>{addingUser.userName}</Text>
        <Spacer />
        <IconButton
          aria-label="user"
          icon={<DeleteIcon />}
          variant="unstyled"
          justifySelf="flex-end"
          onClick={handleOnDeleteButton}
        />
      </Flex>

      <SelectTeamModal
        isOpen={isOpen}
        onClose={onClose}
        teamList={teamList}
        userList={userList}
        setUserList={setUserList}
        addingUser={addingUser}
      />
    </>
  );
};
