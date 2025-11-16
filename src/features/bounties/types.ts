export interface Bounty {
  id: string | number;
  title: string;
  description: string;
  playerName: string;
  reward: string;
  status: string;
  map?: string;
  civilization?: string;
  category?: string;
  notes?: string;
}

export type SortOrder = 'classic' | 'ascending' | 'descending' | 'random';

export interface FilterParams {
  playerNameFilter: string;
  bountyNameFilter: string;
  sortOrder: SortOrder;
}

