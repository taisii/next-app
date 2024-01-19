'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

interface LeagueContextValue {
  playerIds: number[];
  setPlayerIds: Dispatch<SetStateAction<number[]>>;
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
  return (
    <Context.Provider
      value={{
        playerIds,
        setPlayerIds,
      }}
    >
      {children}
    </Context.Provider>
  );
};
