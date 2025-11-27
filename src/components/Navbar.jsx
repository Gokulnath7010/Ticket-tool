import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Smart Ticket System</div>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/create">Raise Ticket</Link>
      </div>
    </nav>
  );
}
