'use client';

import { Button, Checkbox, HStack, VStack, CheckboxGroup } from '@chakra-ui/react';
import { z } from 'zod';

import { MatchResultForm } from './MatchResultForm';
import { useLeagueSelector } from '../contexts/leagueContext';

interface SessionFormProps {
  leagueId: number;
}

const CheckboxGroupSchema = z.array(z.number());

export const SessionForm: React.FC<SessionFormProps> = ({ leagueId }) => {
  const playerIds = useLeagueSelector((v) => v.playerIds);
  const setPlayerIds = useLeagueSelector((v) => v.setPlayerIds);
  const isClicked = useLeagueSelector((v) => v.sessionFormIsClicked);
  const setIsClicked = useLeagueSelector((v) => v.seteSsionFormIsClicke);
  const sessionPlayerIds = useLeagueSelector((v) => v.sessionPlayerIds);
  const setSessionPlayerIds = useLeagueSelector((v) => v.setSessionPlayerIds);

  const handleCheckboxChange = (values: (string | number)[]) => {
    const validationResult = CheckboxGroupSchema.safeParse(
      values.map((value) => (typeof value === 'string' ? parseFloat(value) : value))
    );
    if (validationResult.success) {
      setPlayerIds(validationResult.data);
    }
  };

  const handleCreateButtonClick = () => {
    const playerIdsCopy = [...playerIds].sort((a, b) => a - b);
    setSessionPlayerIds(playerIdsCopy);
    setIsClicked(true);
  };

  return (
    <VStack>
      <HStack>
        <CheckboxGroup value={playerIds as (string | number)[]} onChange={handleCheckboxChange} isDisabled={isClicked}>
          <Checkbox value={1}>飯田</Checkbox>
          <Checkbox value={2}>安斎</Checkbox>
          <Checkbox value={3}>植木</Checkbox>
          <Checkbox value={4}>村岡</Checkbox>
          <Checkbox value={5}>竹下</Checkbox>
        </CheckboxGroup>
      </HStack>
      <Button onClick={handleCreateButtonClick} isDisabled={isClicked}>
        作成
      </Button>
      {isClicked && <MatchResultForm playerIds={sessionPlayerIds} />}
    </VStack>
  );
};
