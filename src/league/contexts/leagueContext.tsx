'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

interface LeagueContextValue {
  playerIds: number[];
  setPlayerIds: Dispatch<SetStateAction<number[]>>;
  sessionPlayerIds: number[];
  setSessionPlayerIds: Dispatch<SetStateAction<number[]>>;
  sessionFormIsClicked: boolean;
  seteSsionFormIsClicke: Dispatch<SetStateAction<boolean>>;
  resetSessionForm: () => void;
  playerIdToPlayerName: Record<number, string>;
  setPlayerIdToPlayerName: Dispatch<SetStateAction<Record<number, string>>>;
}

const Context = createContext<LeagueContextValue>(undefined as unknown as LeagueContextValue);

export function useLeagueSelector<Selected>(selector: (value: LeagueContextValue) => Selected): Selected {
  return useContextSelector(Context, selector);
}

interface Props {
  children: React.ReactNode;
}

export const LeagueProvider: React.FC<Props> = ({ children }) => {
  const [playerIds, setPlayerIds] = useState<number[]>([]);
  const [sessionPlayerIds, setSessionPlayerIds] = useState<number[]>([]);
  const [sessionFormIsClicked, seteSsionFormIsClicke] = useState(false);
  const resetSessionForm = () => {
    setPlayerIds([]);
    setSessionPlayerIds([]);
    seteSsionFormIsClicke(false);
  };

  const [playerIdToPlayerName, setPlayerIdToPlayerName] = useState<Record<number, string>>({});

  return (
    <Context.Provider
      value={{
        playerIds,
        setPlayerIds,
        sessionPlayerIds,
        setSessionPlayerIds,
        sessionFormIsClicked,
        seteSsionFormIsClicke,
        resetSessionForm,
        playerIdToPlayerName,
        setPlayerIdToPlayerName,
      }}
    >
      {children}
    </Context.Provider>
  );
};
