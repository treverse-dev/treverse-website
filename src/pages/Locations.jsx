import { locations } from '../data/locations.js';
import { site } from '../site.js';

export default function Locations() {
  return (
    <div className="shell">
      <header className="page-heading">
        <span className="eyebrow">The Haggle pickup network</span>
        <h1>Locations</h1>
        <p>Find a pickup location near you. Before visiting, check your auction event for its pickup address, dates, and times.</p>
        <a className="text-link" href={`${site.marketplaceUrl}locations`}>View the live Haggle directory <span aria-hidden="true">↗</span></a>
      </header>
      <div className="locations">
        {locations.map(([name, address]) => (
          <article className="location" key={name}>
            <h2>{name}</h2>
            <address>{address}</address>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}>
              View map <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
