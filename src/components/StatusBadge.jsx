export default function StatusBadge({ status }) {
  const color = {
    "ticket raised": "blue",
    "ticket working": "orange",
    "ticket hold": "gray",
    "ticket closed": "green",
  }[status] || "black";

  return <span className={`badge ${color}`}>{status}</span>;
}
