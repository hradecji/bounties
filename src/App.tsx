import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BountiesPage } from './pages/BountiesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    if (!navOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current || !toggleRef.current) return;
      const target = event.target as Node;
      if (navRef.current.contains(target) || toggleRef.current.contains(target)) {
        return;
      }
      setNavOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [navOpen]);

  return (
    <BrowserRouter>
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
            <path fill="#9146FF" d="M40 20h160a20 20 0 0 1 20 20v110l-45 45h-35l-22 22h-33v-22H60L40 175V40a20 20 0 0 1 20-20Z" />
            <path fill="#fff" d="M80 65h20v60H80V65Zm60 0h20v60h-20V65Z" />
          </svg>
        </a>

        <button
          type="button"
          className={`nav-toggle ${navOpen ? 'open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          ref={toggleRef}
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav ref={navRef} className={`main-nav ${navOpen ? 'open' : ''}`}>
          <NavLink to="/" end onClick={closeNav} className="nav-link">
            Bounties
          </NavLink>
          <NavLink to="/leaderboard" onClick={closeNav} className="nav-link">
            Leaderboard
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<BountiesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>

        <div className="bottom-bar"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
