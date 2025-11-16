import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className={styles.icon}>{isDark ? '🌙' : '☀️'}</span>
      <span className={styles.text}>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}

