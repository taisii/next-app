export interface SessionFormInput {
  matchResults: {
    matchPlayerPoints: MatchPlayerPoint[];
  }[];
}

export interface MatchResult {
  matchPlayerPoints: MatchPlayerPoint[];
}

export interface MatchPlayerPoint {
  playerId: number;
  point: number;
}
