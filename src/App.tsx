import { useState, useMemo } from 'react';
import { BountyFilters } from './features/bounties/BountyFilters';
import { BountyList } from './features/bounties/BountyList';
import { getAllBounties, applyFilters } from './features/bounties/data';
import type { FilterParams, SortOrder } from './features/bounties/types';

const defaultFilters: FilterParams = {
  playerNameFilter: '',
  bountyNameFilter: '',
  sortOrder: 'classic' as SortOrder,
};

function App() {
  const [filters, setFilters] = useState<FilterParams>(defaultFilters);

  const allBounties = useMemo(() => getAllBounties(), []);

  const filteredBounties = useMemo(
    () => applyFilters(allBounties, filters),
    [allBounties, filters]
  );

  const handleFiltersChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
  };

  return (
    <div className="app-root">
      <a
        className="twitch-link"
        href="https://www.twitch.tv/grathwrang"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Grathwrang on Twitch"
        title="Watch on Twitch"
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 240 240"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path fill="#9146FF" d="M40 20h160a20 20 0 0 1 20 20v110l-45 45h-35l-22 22h-33v-22H60L40 175V40a20 20 0 0 1 20-20Z"/>
          <path fill="#fff" d="M80 65h20v60H80V65Zm60 0h20v60h-20V65Z"/>
        </svg>
      </a>
      <main className="main-content">
        <section className="content-sheet">
          <p className="hero-subtitle" style={{ textAlign: 'center', marginTop: '22px', fontSize: '25px', marginLeft: '15px' }}>Completed Bounties Archive</p>
          <div className="filter-bar">
            <BountyFilters filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
          <div className="bounty-grid">
            <BountyList bounties={filteredBounties} />
          </div>
        </section>
      </main>
      <div className="bottom-bar"></div>
    </div>
  );
}

export default App;
