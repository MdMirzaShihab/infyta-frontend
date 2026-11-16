import Tags from "./Tags";

// The expertise schedule: one row per entry of `expertise`. `headings` turns the column heads on.
export default function Schedule({ rows, caption, headings = true }) {
  return (
    <table className="sched">
      <caption>{caption}</caption>
      {headings && (
        <thead>
          <tr>
            <th scope="col">Domain</th>
            <th scope="col">What we work with</th>
            <th scope="col">Certifications and specialists</th>
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row) => (
          <tr key={row.key}>
            <th scope="row">{row.title}</th>
            <td>{row.description}</td>
            <td><Tags items={row.certs} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
