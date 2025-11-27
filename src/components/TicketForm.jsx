import React, { useState } from "react";
import axios from "../api/axios";
import "../components/TicketForm.css";
import "../App.css";

export default function TicketForm() {
  const [form, setForm] = useState({
    sender_name: "",
    sender_email: "",
    receiver_name: "",
    receiver_email: "",
    subject: "",
    description: "",
    priority: "medium",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.size > 5 * 1024 * 1024) {
      setMsg("File too large (max 5MB)");
      e.target.value = null;
      return;
    }
    setFile(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const data = new FormData();
      Object.keys(form).forEach((k) => data.append(k, form[k]));
      if (file) data.append("attachment", file);

      const res = await axios.post("/tickets/create/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg(`Ticket created — ID: ${res.data.id}`);

      setForm({
        sender_name: "",
        sender_email: "",
        receiver_name: "",
        receiver_email: "",
        subject: "",
        description: "",
        priority: "medium",
      });
      setFile(null);
    } catch (err) {
      setMsg(err.response?.data?.detail || "Failed to submit");
    }

    setLoading(false);
  };

  return (
  <div className="ticket-form-container">
    <div className="ticket-form-card">

      <div className="card-inner">
        
        {/* LEFT SIDE - TITLE */}
        <div className="left-section">
          <h1 className="ticket-title">
            Raise <br /> a <br /> Ticket
          </h1>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="right-section">
          <form className="ticket-grid" onSubmit={submit}>
            
            <input name="sender_name" placeholder="Your name"
              value={form.sender_name} onChange={handleChange} required />

            <input name="sender_email" type="email" placeholder="Your email"
              value={form.sender_email} onChange={handleChange} required />

            <input name="receiver_name" placeholder="Receiver / Team"
              value={form.receiver_name} onChange={handleChange} required />

            <input name="receiver_email" type="email" placeholder="Receiver email"
              value={form.receiver_email} onChange={handleChange} required />

            <input name="subject" placeholder="Subject"
              value={form.subject} onChange={handleChange} required />

            <textarea
              name="description"
              placeholder="Describe the issue"
              rows="4"
              value={form.description}
              onChange={handleChange}
              required
            />

            <label className="label">Priority</label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <div className="file-row">
              <input type="file" onChange={handleFile} />
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>

          </form>
        </div>

      </div>
    </div>
  </div>
);

}
