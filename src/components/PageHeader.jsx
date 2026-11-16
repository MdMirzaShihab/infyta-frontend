// The top of an inner page: its one <h1>, the lede under it, and anything the page adds below (buttons).
export default function PageHeader({ title, lede, children }) {
  return (
    <section className="pagehead">
      <div className="wrap">
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
