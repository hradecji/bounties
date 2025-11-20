import { useMemo } from 'react';
import { getAllBounties } from '../features/bounties/data';
import styles from './LeaderboardPage.module.css';

interface LeaderboardEntry {
  playerName: string;
  completed: number;
}

export function LeaderboardPage() {
  const leaderboard = useMemo<LeaderboardEntry[]>(() => {
    const counts = new Map<string, number>();
    getAllBounties().forEach((bounty) => {
      const name = bounty.playerName.trim();
      counts.set(name, (counts.get(name) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([playerName, completed]) => ({ playerName, completed }))
      .sort((a, b) => {
        if (b.completed !== a.completed) {
          return b.completed - a.completed;
        }
        return a.playerName.localeCompare(b.playerName, undefined, {
          sensitivity: 'base',
        });
      });
  }, []);

  return (
    <main className="main-content">
      <section className="content-sheet">
        <div className={styles.leaderboardWrapper}>
          <p
            className="hero-subtitle"
            style={{
              textAlign: 'center',
              marginTop: '21px',
              fontSize: '24px',
              marginLeft: '20px',
            }}
          >
            Leaderboard
          </p>

        <div className={styles.frame_hero}>
          <ol className={styles.leaderboardList}>
            {leaderboard.map((entry, index) => (
              <li key={entry.playerName} className={styles.leaderboardItem}>
                <span className={styles.rank}>#{index + 1}</span>
                <span className={styles.playerName}>{entry.playerName}</span>
                <span className={styles.countBadge}>
                  {entry.completed} {entry.completed === 1 ? 'bounty' : 'bounties'}
                </span>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

