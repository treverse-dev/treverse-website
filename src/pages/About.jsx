import BusinessContact from '../components/BusinessContact.jsx';
import { site } from '../site.js';

export default function About() {
  return (
    <div className="shell">
      <header className="page-heading">
        <span className="eyebrow">About Treverse</span>
        <h1>A second life for inventory.<br />A practical partner for your business.</h1>
        <p>Based in Nashville, Treverse works with retailers, importers, and logistics companies to move returned and excess products back into the market.</p>
      </header>
      <div className="about-layout">
        <div className="prose">
          <h2>From inventory to opportunity.</h2>
          <p>Customer returns, seasonal stock, closeouts, and inventory pulls all need a path forward. We bring together distribution, export, retail, and inventory reporting to support that next step.</p>
          <p>Our services include online sales with dynamic pricing, domestic wholesale, international sales, and revenue-share programs with item-level reporting.</p>
          <p>For business partners, Treverse is the place to discuss inventory and operational needs. For shoppers, <a href={site.marketplaceUrl}>Haggle at astock.com</a> is the place to explore auctions and pickup information.</p>
        </div>
        <figure className="facility-photo">
          <img className="about-image" src="/assets/logistics.jpg" alt="Auction pickup entrance with A-Stock signage" width="1600" height="1067" />
          <figcaption>Auction pickup entrance, pictured under the A-Stock name.</figcaption>
        </figure>
      </div>
      <section className="how" aria-labelledby="capabilities-title">
        <span className="eyebrow">How we support inventory recovery</span>
        <h2 id="capabilities-title">Connected services. Clear visibility.</h2>
        <ol className="steps">
          <li><h3>Inventory processing</h3><p>High-volume item processing and manifesting help prepare products for their next sales channel.</p></li>
          <li><h3>Multiple sales channels</h3><p>Domestic wholesale, export, retail, and online sales provide different paths back to customers.</p></li>
          <li><h3>Item-level reporting</h3><p>Standard and custom reports support visibility through the product lifecycle, including revenue-share programs.</p></li>
        </ol>
      </section>
      <section className="marketplace-panel" aria-labelledby="marketplace-title">
        <div><span className="eyebrow">For shoppers</span><h2 id="marketplace-title">Meet Haggle.</h2><p>The marketplace at astock.com now welcomes shoppers as Haggle. Browse timed auctions and check each event’s pickup location and schedule before bidding.</p></div>
        <a className="button" href={site.marketplaceUrl}>Shop Haggle <span aria-hidden="true">↗</span></a>
      </section>
      <section className="faq">
        <span className="eyebrow">For business partners</span><h2>Common questions</h2>
        <details open><summary>What kinds of inventory does Treverse work with?</summary><p>Our services cover customer returns, seasonal stock, closeout products, and other excess inventory from retailers, importers, and logistics companies.</p></details>
        <details><summary>What sales channels are available?</summary><p>Our distribution services include domestic wholesale, international sales, online sales, and retail. The appropriate approach depends on the inventory and operational requirements.</p></details>
        <details><summary>Can we see what happens to our inventory?</summary><p>Our reporting capabilities include product-lifecycle visibility, standard and custom reports, and item-level sales reporting for revenue-share programs.</p></details>
        <details><summary>Where should shoppers go for auction questions?</summary><p>Visit <a href={site.marketplaceUrl}>Haggle</a> for auction listings, account information, and the pickup requirements for each event.</p></details>
      </section>
      <BusinessContact />
    </div>
  );
}
