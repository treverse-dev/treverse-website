import { site } from '../site.js';

export default function BusinessContact() {
  const inquiry = site.businessEmail
    ? `mailto:${site.businessEmail}?subject=${encodeURIComponent('Inventory partnership inquiry')}`
    : null;
  return (
    <section className="business-contact" id="business-contact" aria-labelledby="contact-title">
      <div>
        <span className="eyebrow">For retailers, importers & logistics partners</span>
        <h2 id="contact-title">Give your inventory its next opportunity.</h2>
        <p>Tell us about your product categories, inventory volume, location, and timing so we can discuss an approach for your business.</p>
      </div>
      <div className="contact-actions">
        {inquiry && <a className="button" href={inquiry}>Discuss your inventory <span aria-hidden="true">↗</span></a>}
        <a className="text-link" href="/jobs/">Looking for a career? Join our team.</a>
      </div>
    </section>
  );
}
