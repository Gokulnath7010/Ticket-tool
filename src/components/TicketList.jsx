import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
  axios.get("/tickets/")
    .then((res) => {
      console.log("API DATA:", res.data);
      setTickets(res.data);
    })
    .catch((err) => {
      console.log("FETCH ERROR:", err);
    });
}, []);


  return (
    <section className="card">
      <h2>All Tickets</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Sender</th>
            <th>Priority</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.subject}</td>
              <td>{t.sender_name}</td>
              <td className={`priority ${t.priority}`}>{t.priority}</td>
              <td><StatusBadge status={t.status} /></td>
              <td>
                <Link className="btn" to={`/ticket/${t.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
