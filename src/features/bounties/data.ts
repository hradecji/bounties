import bountiesData from '../../data/bounties.json';
import type { Bounty, FilterParams, SortOrder } from './types';

export function getAllBounties(): Bounty[] {
  return bountiesData as Bounty[];
}

export function filterByPlayerName(
  bounties: Bounty[],
  playerNameFilter: string
): Bounty[] {
  if (!playerNameFilter.trim()) {
    return bounties;
  }

  const filterLower = playerNameFilter.toLowerCase();
  return bounties.filter((bounty) =>
    bounty.playerName.toLowerCase().includes(filterLower)
  );
}

export function filterByBountyName(
  bounties: Bounty[],
  bountyNameFilter: string
): Bounty[] {
  if (!bountyNameFilter.trim()) {
    return bounties;
  }

  const filterLower = bountyNameFilter.toLowerCase();
  return bounties.filter((bounty) =>
    bounty.title.toLowerCase().includes(filterLower)
  );
}

export function filterByDescription(
  bounties: Bounty[],
  descriptionFilter: string
): Bounty[] {
  if (!descriptionFilter.trim()) {
    return bounties;
  }

  const filterLower = descriptionFilter.toLowerCase();
  return bounties.filter((bounty) =>
    bounty.description.toLowerCase().includes(filterLower)
  );
}

function isAlphabetic(str: string): boolean {
  return /^[a-zA-Z]/.test(str);
}

function classicSort(a: string, b: string): number {
  const aIsAlpha = isAlphabetic(a);
  const bIsAlpha = isAlphabetic(b);

  // Non-alphabetic comes before alphabetic
  if (!aIsAlpha && bIsAlpha) return -1;
  if (aIsAlpha && !bIsAlpha) return 1;

  // Both are same type, sort normally
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
}

export function sortByPlayerName(
  bounties: Bounty[],
  order: SortOrder
): Bounty[] {
  const sorted = [...bounties];

  // Handle random separately
  if (order === ('random' as SortOrder)) {
    // Fisher-Yates shuffle
    for (let i = sorted.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
    }
    return sorted;
  }

  sorted.sort((a, b) => {
    const nameA = a.playerName;
    const nameB = b.playerName;

    if (order === ('classic' as SortOrder)) {
      return classicSort(nameA, nameB);
    } else if (order === ('ascending' as SortOrder)) {
      return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
    } else {
      // descending
      return nameB.localeCompare(nameA, undefined, { sensitivity: 'base' });
    }
  });

  return sorted;
}

export function applyFilters(
  bounties: Bounty[],
  filters: FilterParams
): Bounty[] {
  let filtered = filterByPlayerName(bounties, filters.playerNameFilter);
  filtered = filterByBountyName(filtered, filters.bountyNameFilter);
  filtered = filterByDescription(filtered, filters.descriptionFilter);
  filtered = sortByPlayerName(filtered, filters.sortOrder);
  return filtered;
}

export function getUniquePlayerNames(bounties: Bounty[]): string[] {
  // Use Map to deduplicate case-insensitively, keeping first occurrence
  const uniqueMap = new Map<string, string>();
  
  bounties.forEach((bounty) => {
    const lowerName = bounty.playerName.toLowerCase();
    if (!uniqueMap.has(lowerName)) {
      uniqueMap.set(lowerName, bounty.playerName);
    }
  });
  
  // Return unique names sorted alphabetically
  return Array.from(uniqueMap.values()).sort();
}

