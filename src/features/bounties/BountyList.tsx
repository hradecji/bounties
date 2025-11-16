import type { Bounty } from './types';
import { BountyCard } from './BountyCard';
import styles from './BountyList.module.css';

interface BountyListProps {
  bounties: Bounty[];
}

export function BountyList({ bounties }: BountyListProps) {
  if (bounties.length === 0) {
    return (
      <section className={styles.emptyState}>
        <p className={styles.emptyMessage}>
          No completed bounties match these filters.
        </p>
        <p className={styles.emptyHint}>
          Try adjusting your filters or clearing them to see more results.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.list} role="list">
      {bounties.map((bounty) => (
        <div key={bounty.id} role="listitem">
          <BountyCard bounty={bounty} />
        </div>
      ))}
    </section>
  );
}

