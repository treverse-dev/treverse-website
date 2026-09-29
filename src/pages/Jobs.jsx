export default function Jobs() {
  return (
    <div className="shell">
      <header className="page-heading">
        <span className="eyebrow">
          {"Careers at Treverse"}
        </span>
        <h1>
          {"Join our growing team."}
        </h1>
        <p>
          {"Start your next career chapter with us."}
        </p>
      </header>
      <section className="jobs" aria-label="Positions">
        <article className="job">
          <div>
            <h2 style={{"fontSize": "1.55rem"}}>
              <a href="https://www.linkedin.com/jobs/view/4257409629">
                {"Machine Learning Software Engineer"}
              </a>
            </h2>
            <p>
              {"On site"}
            </p>
          </div>
          <span className="badge">
            {"Position filled"}
          </span>
        </article>
        <article className="job">
          <div>
            <h2 style={{"fontSize": "1.55rem"}}>
              <a href="https://www.linkedin.com/jobs/view/4267788035">
                {"Full Stack Software Engineer"}
              </a>
            </h2>
            <p>
              {"On site"}
            </p>
          </div>
          <span className="badge">
            {"Position filled"}
          </span>
        </article>
        <article className="job">
          <div>
            <h2 style={{"fontSize": "1.55rem"}}>
              <a href="https://www.linkedin.com/jobs/view/4282337682">
                {"Mobile Software Engineer"}
              </a>
            </h2>
            <p>
              {"On site"}
            </p>
          </div>
          <span className="badge">
            {"Position filled"}
          </span>
        </article>
      </section>
      <section className="cta">
        <h2>
          {"Apply now."}
        </h2>
        <p>
          {"Share your resume with our team."}
        </p>
        <a className="button" href="https://treverse.notion.site/1916db5f5eb68037b122ea0a8ff63848?pvs=105">
          {"Upload resume"}
          <span aria-hidden="true">
            {"↗"}
          </span>
        </a>
      </section>
    </div>
  );
}
