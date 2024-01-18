import { Checkbox, HStack } from '@chakra-ui/react';

interface SessionFormProps {
  leagueId: number;
}

export const SessionForm: React.FC<SessionFormProps> = ({ leagueId }) => {
  return (
    <HStack>
      <Checkbox>飯田</Checkbox>
      <Checkbox>飯田</Checkbox>
      <Checkbox>飯田</Checkbox>
      <Checkbox>飯田</Checkbox>
      <Checkbox>飯田</Checkbox>
    </HStack>
  );
};
