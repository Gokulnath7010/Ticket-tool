import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function TicketView() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  // Load ticket
  useEffect(() => {
    axios.get(`/tickets/${id}/`).then((res) => setTicket(res.data));
  }, [id]);

  // Update ticket status
  const updateStatus = async (e) => {
    await axios.patch(`/tickets/${id}/update-status/`, {
      status: e.target.value,
    });

    // Reload ticket after update
    axios.get(`/tickets/${id}/`).then((res) => setTicket(res.data));
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <section className="card">
      <h2>Ticket #{ticket.id}</h2>

      <p><strong>Subject:</strong> {ticket.subject}</p>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Sender:</strong> {ticket.sender_name} ({ticket.sender_email})</p>

      <p>
        <strong>Status:</strong> 
        <StatusBadge status={ticket.status} />
      </p>

      <label>Update Status</label>
      <select value={ticket.status} onChange={updateStatus}>
        <option value="ticket raised">Ticket Raised</option>
        <option value="ticket working">Ticket Working</option>
        <option value="ticket hold">Ticket Hold</option>
        <option value="ticket closed">Ticket Closed</option>
      </select>

      {ticket.attachment && (
        <div className="attach-box">
          <a href={ticket.attachment} download>Download Attachment</a>
        </div>
      )}
    </section>
  );
}
