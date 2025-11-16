import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

interface HeaderProps {
  isDarkTheme: boolean;
  onThemeToggle: () => void;
}

export function Header({ isDarkTheme, onThemeToggle }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Grathwrang's Bounty Board</h1>
          <p className={styles.subtitle}>Completed Bounties Archive</p>
        </div>
        <ThemeToggle isDark={isDarkTheme} onToggle={onThemeToggle} />
      </div>
    </header>
  );
}

