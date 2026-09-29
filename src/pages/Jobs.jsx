import { site } from '../site.js';

export default function Jobs() {
  return (
    <div className="shell">
      <header className="page-heading">
        <span className="eyebrow">Careers at Treverse</span>
        <h1>Help give inventory a second life.</h1>
        <p>Interested in working with a team connecting technology, logistics, and retail? Introduce yourself.</p>
      </header>
      <section className="career-invitation">
        <h2>Share your experience.</h2>
        <p>Tell us about your background, the kind of work you’re interested in, and your preferred location. Use our resume submission page to send your information to the team.</p>
        <a className="button" href={site.resumeUrl}>Share your resume <span aria-hidden="true">↗</span></a>
        <p className="career-note">This is a general expression of interest, rather than an application for a listed opening.</p>
      </section>
    </div>
  );
}
