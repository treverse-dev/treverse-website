export default function NotFound() {
  return (
    <div className="shell not-found">
      <span className="eyebrow">
        {"404"}
      </span>
      <h1>
        {"Let’s get you back on track."}
      </h1>
      <p>
        {"We couldn’t find that page."}
      </p>
      <a className="button" href="/">
        {"Back to home"}
        <span aria-hidden="true">
          {"↗"}
        </span>
      </a>
    </div>
  );
}
