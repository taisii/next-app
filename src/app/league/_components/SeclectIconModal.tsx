import {
  Box,
  Button,
  Grid,
  GridItem,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import { teamIconUriList } from '../_constants/Constants';
import { AddingTeam } from '../page';

type SelectIconModalProps = {
  isOpen: boolean;
  onOpenCreateTeam: () => void;
  onClose: () => void;
  availableIndexList: number[];
  selectedIndex: number;
  addingTeam: AddingTeam;
  setAddingTeam: Dispatch<SetStateAction<AddingTeam>>;
};

export const SelectIconModal = ({
  isOpen,
  onOpenCreateTeam,
  onClose,
  availableIndexList,
  selectedIndex,
  addingTeam,
  setAddingTeam,
}: SelectIconModalProps) => {
  const handleOnClickIconDecideButton = () => {
    setAddingTeam({ name: addingTeam.name, iconUriIndex: selectedIndexState });
    onClose();
    onOpenCreateTeam();
  };
  const [selectedIndexState, setSelectedIndexState] = useState(selectedIndex);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="90%">
        <ModalHeader fontWeight="bold">Select Icon</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box overflowY="scroll" height="70%">
            <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(3, 1fr)" gap="1rem">
              {availableIndexList.map((availableIndex) => {
                if (availableIndex === selectedIndexState) {
                  return (
                    <GridItem key={availableIndex}>
                      <Box
                        p={1}
                        borderWidth="2px"
                        borderColor="green.500"
                        borderRadius="md"
                        width="100%"
                        display="flex"
                        justifyContent="center"
                      >
                        <Img
                          src={teamIconUriList[availableIndex]}
                          borderWidth={1}
                          borderColor="black"
                          height="5rem"
                          width="5rem"
                        />
                      </Box>
                    </GridItem>
                  );
                } else {
                  return (
                    <GridItem key={availableIndex}>
                      <Box
                        p={1}
                        borderWidth="2px"
                        borderColor="transparent"
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        onClick={() => {
                          setSelectedIndexState(availableIndex);
                        }}
                      >
                        <Img
                          src={teamIconUriList[availableIndex]}
                          borderWidth={1}
                          borderColor="black"
                          height="5rem"
                          width="5rem"
                        />
                      </Box>
                    </GridItem>
                  );
                }
              })}
            </Grid>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleOnClickIconDecideButton}>決定</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
