// A drawing sheet's title block: a row of label and value cells. `value` may be JSX (links).
export default function TitleBlock({ items, className }) {
  return (
    <dl className={["titleblock", className].filter(Boolean).join(" ")}>
      {items.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
