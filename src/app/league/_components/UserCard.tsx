import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import { teamIconUriList } from '../_constants/Constants';
import { AddingUser } from '../page';

type UserCardProps = {
  addingUser: AddingUser;
  userList: AddingUser[];
  setUserList: Dispatch<SetStateAction<AddingUser[]>>;
};

export const UserCard = ({ addingUser, userList, setUserList }: UserCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnDeleteButton = () => {
    setUserList(userList.filter((user) => user.userName !== addingUser.userName));
  };

  return (
    <>
      <Flex flexDir="row" alignItems="center">
        <Icon as={AiOutlineUser} mr="2rem" boxSize="2rem" onClick={onOpen} />
        <Text>{addingUser.userName}</Text>
        <Spacer />
        <IconButton
          aria-label="user"
          icon={<DeleteIcon />}
          variant="unstyled"
          justifySelf="flex-end"
          onClick={handleOnDeleteButton}
        />
      </Flex>

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
