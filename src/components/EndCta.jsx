// The end-of-page call to action (mock `serviceView`): a panel with a heading and its buttons, in its own band.
export default function EndCta({ title, children }) {
  return (
    <section className="band band--flush">
      <div className="wrap">
        <div className="panel endcta">
          <h2>{title}</h2>
          <div className="hero__cta">{children}</div>
        </div>
      </div>
    </section>
  );
}
