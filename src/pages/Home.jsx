import BusinessContact from '../components/BusinessContact.jsx';
import { site } from '../site.js';

export default function Home() {
  return (
    <div className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-logo" src="/assets/logo.png" alt="Treverse LLC" width="543" height="166" />
        <img className="hero-image" src="/assets/trucks.jpg" alt="Aerial view of trucks at a distribution center" width="1800" height="1199" fetchPriority="high" />
        <div className="hero-copy">
          <h1 id="hero-title">
            {"Where technology meets"}
            <br />
            {" "}
            <em>
              {"Reverse Logistics"}
            </em>
          </h1>
          <p>
            {"Treverse LLC partners with retailers, logistics companies, and importers to give a second life to obsolete inventory—from customer returns and seasonal stock to liquidation events and inventory pulls."}
          </p>
          <div className="hero-actions"><a className="button" href="#business-contact">Explore a partnership <span aria-hidden="true">↓</span></a><a className="text-link" href={site.marketplaceUrl}>Looking to shop? Visit Haggle.</a></div>
        </div>
      </section>
      <section aria-labelledby="services-title">
        <div className="section-intro">
          <div>
            <span className="eyebrow">
              {"What we do"}
            </span>
            <h2 id="services-title">
              {"Services"}
            </h2>
          </div>
          <p>
            {"Distribution, export, inventory visibility, and retail channels work together to give returned and excess products a path back to market."}
          </p>
        </div>
        <div className="services">
          <article className="service">
            <div className="service-content">
              <span className="eyebrow">
                {"01 / Our services"}
              </span>
              <h2>
                {"Distribution"}
              </h2>
              <ul>
                <li>
                  {"Online with dynamic pricing"}
                </li>
                <li>
                  {"Retail"}
                  <ul>
                    <li>
                      {"Item-level reporting"}
                    </li>
                    <li>
                      {"Revenue share capabilities"}
                    </li>
                  </ul>
                </li>
                <li>
                  {"Domestic wholesale"}
                </li>
                <li>
                  {"Export / international sales"}
                </li>
              </ul>
              <a className="button" href="/about/">
                {"Read more"}
                <span aria-hidden="true">
                  {"↗"}
                </span>
              </a>
            </div>
            <img className="service-image" src="/assets/distribution.jpg" alt="People overlooking a distribution cityscape" width="1200" height="800" loading="lazy" decoding="async" />
          </article>
          <article className="service">
            <div className="service-content">
              <span className="eyebrow">
                {"02 / Our services"}
              </span>
              <h2>
                {"Export"}
              </h2>
              <ul>
                <li>
                  {"International sales"}
                </li>
                <li>
                  {"High-volume item processing and manifesting"}
                </li>
                <li>
                  {"Online sales"}
                </li>
              </ul>
              <a className="button" href="/about/">
                {"Read more"}
                <span aria-hidden="true">
                  {"↗"}
                </span>
              </a>
            </div>
            <img className="service-image" src="/assets/export.jpg" alt="Inventory being loaded into a shipping trailer" width="1200" height="800" loading="lazy" decoding="async" />
          </article>
          <article className="service">
            <div className="service-content">
              <span className="eyebrow">
                {"03 / Our services"}
              </span>
              <h2>Inventory management</h2>
              <ul>
                <li>
                  {"Visibility throughout the product lifecycle"}
                </li>
                <li>
                  {"Standard and custom reporting"}
                </li>
                <li>
                  {"Custom operational plans"}
                </li>
              </ul>
              <a className="button" href="/locations/">
                {"Read more"}
                <span aria-hidden="true">
                  {"↗"}
                </span>
              </a>
            </div>
            <img className="service-image" src="/assets/warehouse.jpg" alt="Inventory racks and a forklift in a warehouse" width="1200" height="800" loading="lazy" decoding="async" />
          </article>
          <article className="service">
            <div className="service-content">
              <span className="eyebrow">
                {"04 / Our services"}
              </span>
              <h2>
                {"Retail & marketplace"}
              </h2>
              <p className="service-description">Connect products with shoppers through Haggle, the marketplace at astock.com, and our retail channels.</p>
              <ul>
                <li>
                  {"Haggle online marketplace"}
                </li>
                <li>
                  {"Revenue share with item-level sales reporting"}
                </li>
                <li>
                  {"Bin stores"}
                </li>
                <li>
                  {"Other specialties"}
                </li>
              </ul>
              <a className="button" href={site.marketplaceUrl}>
                {"Shop Haggle"}
                <span aria-hidden="true">
                  {"↗"}
                </span>
              </a>
            </div>
            <img className="service-image" src="/assets/marketplace.jpg" alt="Online inventory and sales reporting on a laptop" width="1200" height="800" loading="lazy" decoding="async" />
          </article>
        </div>
      </section>
      <BusinessContact />
    </div>
  );
}
