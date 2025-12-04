import { useState, useEffect } from 'react';
import type { FilterParams, SortOrder } from './types';
import { getUniquePlayerNames, getAllBounties } from './data';
import styles from './BountyFilters.module.css';

interface BountyFiltersProps {
  filters: FilterParams;
  onFiltersChange: (filters: FilterParams) => void;
}

export function BountyFilters({
  filters,
  onFiltersChange,
}: BountyFiltersProps) {
  const [playerSuggestions, setPlayerSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const allBounties = getAllBounties();
    const uniqueNames = getUniquePlayerNames(allBounties);
    setPlayerSuggestions(uniqueNames);
  }, []);

  useEffect(() => {
    if (filters.playerNameFilter.trim()) {
      const filterLower = filters.playerNameFilter.toLowerCase();
      const filtered = playerSuggestions.filter((name) =>
        name.toLowerCase().includes(filterLower)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [filters.playerNameFilter, playerSuggestions]);

  const handlePlayerNameChange = (playerNameFilter: string) => {
    onFiltersChange({ ...filters, playerNameFilter });
  };

  const handleBountyNameChange = (bountyNameFilter: string) => {
    onFiltersChange({ ...filters, bountyNameFilter });
  };

  const handleDescriptionChange = (descriptionFilter: string) => {
    onFiltersChange({ ...filters, descriptionFilter });
  };

  const handleSortChange = (sortOrder: SortOrder) => {
    onFiltersChange({ ...filters, sortOrder });
  };

  const handleSuggestionClick = (name: string) => {
    handlePlayerNameChange(name);
    setShowSuggestions(false);
  };

  return (
    <section className={styles.filters} aria-label="Filter bounties">
      <div className={styles.filterGroup}>
        <label htmlFor="playerName" className={styles.label}>
          Player Name
        </label>
        <div className={styles.autocomplete}>
          <input
            id="playerName"
            type="text"
            value={filters.playerNameFilter}
            onChange={(e) => handlePlayerNameChange(e.target.value)}
            onFocus={() => {
              if (filteredSuggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Filter by player name..."
            className={styles.input}
            autoComplete="off"
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className={styles.suggestions} role="listbox">
              {filteredSuggestions.map((name) => (
                <li
                  key={name}
                  role="option"
                  className={styles.suggestionItem}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSuggestionClick(name);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="bountyName" className={styles.label}>
          Bounty Name
        </label>
        <input
          id="bountyName"
          type="text"
          value={filters.bountyNameFilter}
          onChange={(e) => handleBountyNameChange(e.target.value)}
          placeholder="Filter by bounty name..."
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <input
          id="description"
          type="text"
          value={filters.descriptionFilter}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Filter by bounty description..."
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sortOrder" className={styles.label}>
          Sort
        </label>
        <select
          id="sortOrder"
          value={filters.sortOrder}
          onChange={(e) => handleSortChange(e.target.value as SortOrder)}
          className={styles.select}
        >
          <option value="classic">Classic (numbers/chars, then A-Z)</option>
          <option value="ascending">Ascending (A-Z)</option>
          <option value="descending">Descending (Z-A)</option>
          <option value="random">Random</option>
        </select>
      </div>
    </section>
  );
}

