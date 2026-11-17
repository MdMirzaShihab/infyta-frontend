// The end-of-page call to action (mock `serviceView`): a panel with a heading and its buttons, in its own band.
export default function EndCta({ title, children, flush = true, svc }) {
  return (
    <section className={flush ? "band band--flush" : "band"} data-svc={svc}>
      <div className="wrap">
        <div className="panel endcta on-slab">
          <h2>{title}</h2>
          <div className="hero__cta">{children}</div>
        </div>
      </div>
    </section>
  );
}
