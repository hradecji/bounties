import type { Bounty } from './types';
import styles from './BountyCard.module.css';

interface BountyCardProps {
  bounty: Bounty;
}

export function BountyCard({ bounty }: BountyCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{bounty.title}</h2>
        <div className={styles.player}>by {bounty.playerName}</div>
      </div>

      <p className={styles.description}>{bounty.description}</p>

      <div className={styles.metadata}>
        <div className={styles.reward}>
          <span className={styles.label}>Reward:</span>
          <span className={styles.value}>{bounty.reward}</span>
        </div>

        {bounty.map && (
          <div className={styles.metaItem}>
            <span className={styles.label}>Map:</span>
            <span className={styles.value}>{bounty.map}</span>
          </div>
        )}

        {bounty.civilization && (
          <div className={styles.metaItem}>
            <span className={styles.label}>Civilization:</span>
            <span className={styles.value}>{bounty.civilization}</span>
          </div>
        )}

        {bounty.category && (
          <div className={styles.metaItem}>
            <span className={styles.label}>Category:</span>
            <span className={styles.value}>{bounty.category}</span>
          </div>
        )}

        {bounty.notes && (
          <div className={styles.notes}>
            <span className={styles.label}>Notes:</span>
            <span className={styles.value}>{bounty.notes}</span>
          </div>
        )}
      </div>
    </article>
  );
}

