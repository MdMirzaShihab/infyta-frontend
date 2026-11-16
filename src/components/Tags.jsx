export default function Tags({ items }) {
  return (
    <div className="tags">
      {items.map((item) => <span key={item} className="tag">{item}</span>)}
    </div>
  );
}
