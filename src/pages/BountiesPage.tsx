import { useMemo, useState } from 'react';
import { BountyFilters } from '../features/bounties/BountyFilters';
import { BountyList } from '../features/bounties/BountyList';
import { applyFilters, getAllBounties } from '../features/bounties/data';
import type { FilterParams, SortOrder } from '../features/bounties/types';

const defaultFilters: FilterParams = {
  playerNameFilter: '',
  bountyNameFilter: '',
  sortOrder: 'classic' as SortOrder,
};

export function BountiesPage() {
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
    <main className="main-content">
      <section className="content-sheet">
        <p
          className="hero-subtitle"
          style={{
            textAlign: 'center',
            marginTop: '21px',
            fontSize: '24px',
            marginLeft: '20px',
          }}
        >
          Completed Bounties Archive
        </p>

        <div className="filter-bar">
          <BountyFilters filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        <div className="bounty-grid">
          <BountyList bounties={filteredBounties} />
        </div>
      </section>
    </main>
  );
}

