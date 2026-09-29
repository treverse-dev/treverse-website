import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Locations from './pages/Locations.jsx';
import Jobs from './pages/Jobs.jsx';
import NotFound from './pages/NotFound.jsx';

const pages = { home: Home, about: About, locations: Locations, jobs: Jobs, 'not-found': NotFound };
const navigation = [['about', 'About'], ['locations', 'Locations'], ['jobs', 'Jobs']];

export default function App({ page = 'home' }) {
  const Content = pages[page] ?? NotFound;
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="shell nav" aria-label="Main navigation">
          <a className="wordmark" href="/" aria-label="Treverse home">
            <img src="/assets/mark.png" alt="" width="32" height="40" />
            Treverse
          </a>
          <div className="nav-links">
            {navigation.map(([key, label]) => (
              <a key={key} href={`/${key}/`} aria-current={page === key ? 'page' : undefined}>{label}</a>
            ))}
          </div>
        </nav>
      </header>
      <main id="main"><Content /></main>
      <footer className="site-footer">
        <div className="shell footer-row">
          <div className="footer-brand">
            <a className="wordmark" href="/">Treverse LLC</a>
            <p>© {new Date().getFullYear()} Treverse LLC. All rights reserved.</p>
          </div>
          <nav className="social" aria-label="Social media">
            <a href="https://www.facebook.com/AStockAuctions/">Facebook</a>
            <a href="https://www.instagram.com/_a_stock/">Instagram</a>
            <a href="https://www.youtube.com/@AStockBids">YouTube</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
