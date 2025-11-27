import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';


export default function TicketDetails() {
const { id } = useParams();
const [ticket, setTicket] = useState(null);
const [loading, setLoading] = useState(true);
const [status, setStatus] = useState('');
const navigate = useNavigate();


useEffect(() => {
axios.get(`/tickets/${id}/`).then(res => { setTicket(res.data); setStatus(res.data.status); }).catch(console.error).finally(() => setLoading(false));
}, [id]);


const updateStatus = async () => {
try {
await axios.patch(`/tickets/${id}/`, { status });
alert('Status updated');
navigate('/tickets');
} catch (err) { console.error(err); alert('Failed'); }
};


if (loading) return <div>Loading...</div>;
if (!ticket) return <div>Ticket not found</div>;


return (
<div className="card">
<h2>Ticket #{ticket.id}</h2>
<p><strong>Subject:</strong> {ticket.subject}</p>
<p><strong>Description:</strong> {ticket.description}</p>
<p><strong>Priority:</strong> {ticket.priority}</p>
<p><strong>Status:</strong> {ticket.status}</p>


<label>Change status:</label>
<select value={status} onChange={e => setStatus(e.target.value)}>
<option value="raised">raised</option>
<option value="working">working</option>
<option value="hold">hold</option>
<option value="closed">closed</option>
</select>
<button onClick={updateStatus}>Update</button>
</div>
);
}