import { jobs } from '../data/jobs.js';
import { site } from '../site.js';

function List({ items }) {
  return (
    <ul>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function Posting({ job }) {
  return (
    <article className="posting" id={job.slug} aria-labelledby={`${job.slug}-title`}>
      <header className="posting-heading">
        <span className="eyebrow">{job.subtitle}</span>
        <h2 id={`${job.slug}-title`}>{job.title}</h2>
        <div className="posting-actions">
          <a className="button" href={job.applyUrl}>Apply for this role <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#openings">Back to all openings</a>
        </div>
      </header>
      <div className="posting-body">
        <section>
          <h3>About Haggle</h3>
          {job.about.map((text) => <p key={text}>{text}</p>)}
        </section>
        <section>
          <h3>The role</h3>
          {job.role.map((text) => <p key={text}>{text}</p>)}
        </section>
        <section>
          <h3>What you’ll do</h3>
          <List items={job.responsibilities} />
        </section>
        <section>
          <h3>What we’re looking for</h3>
          <h4>Must-haves</h4>
          <List items={job.mustHaves} />
          <h4>Nice-to-haves</h4>
          <List items={job.niceToHaves} />
        </section>
        <section>
          <h3>Our tech stack</h3>
          <dl className="stack">
            {job.stack.map(([label, text]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <h3>What success looks like</h3>
          {job.success.map((text) => <p key={text}>{text}</p>)}
        </section>
        <p className="posting-apply">
          <a className="button" href={job.applyUrl}>Apply for {job.title} <span aria-hidden="true">↗</span></a>
        </p>
      </div>
    </article>
  );
}

export default function Jobs() {
  return (
    <div className="shell">
      <header className="page-heading">
        <span className="eyebrow">Careers at Treverse</span>
        <h1>Help give inventory a second life.</h1>
        <p>We build the technology, logistics, and marketplace behind Haggle. Browse the open roles below, or introduce yourself if nothing fits yet.</p>
      </header>
      <section className="jobs" id="openings" aria-labelledby="openings-title">
        <h2 id="openings-title" className="visually-hidden">Open positions</h2>
        {jobs.map((job) => (
          <div className="job" key={job.slug}>
            <div>
              <h3><a href={`#${job.slug}`}>{job.title}</a></h3>
              <p>{job.summary}</p>
            </div>
            <span className="badge">{job.team}</span>
          </div>
        ))}
      </section>
      {jobs.map((job) => <Posting job={job} key={job.slug} />)}
      <section className="career-invitation">
        <h2>Don’t see the right role?</h2>
        <p>Tell us about your background, the kind of work you’re interested in, and your preferred location. Use our resume submission page to send your information to the team.</p>
        <a className="button" href={site.resumeUrl}>Share your resume <span aria-hidden="true">↗</span></a>
        <p className="career-note">This is a general expression of interest, rather than an application for a listed opening.</p>
      </section>
    </div>
  );
}
