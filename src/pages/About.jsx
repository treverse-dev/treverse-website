export default function About() {
  return (
    <div className="shell">
      <header className="page-heading">
        <span className="eyebrow">
          {"About Treverse"}
        </span>
        <h1>
          {"Welcome to Treverse,"}
          <br />
          {"a Nashville-based company."}
        </h1>
        <p>
          {"Our mission is to give our customers the power to name their price."}
        </p>
      </header>
      <div className="about-layout">
        <div className="prose">
          <p>
            {"All the items in our sales start at just one dollar. Our inventory changes weekly, allowing you to browse products for all occasions. "}
            <a href="https://a-stock.bid/Account/AccountSettings">
              {"Sign up for our newsletter"}
            </a>
            {" so you don’t miss out on these great deals."}
          </p>
          <p>
            {"We’ll let you in on our little secret. We buy in bulk from major retailers, which helps us help you name your price. These items tend to be overstocked, seasonal, or closeout products."}
          </p>
        </div>
        <img className="about-image" src="/assets/logistics.jpg" alt="A-Stock auction pickup entrance" width="1600" height="1067" />
      </div>
      <section className="how">
        <h2>
          {"How does it work?"}
        </h2>
        <ol className="steps">
          <li>
            {"Items at a specific location are grouped into a sale with a specified end date and time."}
          </li>
          <li>
            {"At the close of the sale, the winning bidder receives a notice and their credit card is automatically charged."}
          </li>
          <li>
            {"Each sale lists the specific days and location where the winning bidder can pick up their items."}
          </li>
        </ol>
        <p className="note">
          {"Local pickup only. We do not offer shipping, and items cannot be transferred between locations. Items not picked up within the allotted time are forfeited."}
        </p>
      </section>
      <section className="faq">
        <span className="eyebrow">
          {"A few common questions"}
        </span>
        <h2>
          {"FAQ"}
        </h2>
        <details open>
          <summary>
            {"Who is Treverse LLC?"}
          </summary>
          <p>
            {"We are a reverse logistics company working on returning deep discounts to our customers through strategic purchasing."}
          </p>
        </details>
        <details>
          <summary>
            {"What is reverse logistics?"}
          </summary>
          <p>
            {"We work with big-box retailers to give returned and excess inventory a second life."}
          </p>
        </details>
        <details>
          <summary>
            {"How do we provide deep-discount products?"}
          </summary>
          <p>
            {"We work with big-box retailers who have customer returns, overstock products, or abandoned inventory. We liquidate that inventory to provide deals to our customers."}
          </p>
        </details>
      </section>
    </div>
  );
}
