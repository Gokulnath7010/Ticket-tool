import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
try {
const res = await axios.post('/auth/login/', { email, password });
// Save token in localStorage (simple)
localStorage.setItem('token', res.data.token);
// Set default header
axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
navigate('/dashboard');
} catch (err) {
console.error(err);
alert('Login failed');
}
};


return (
<div className="card">
<h2>Login</h2>
<form onSubmit={submit} className="form-grid">
<input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
<button type="submit">Login</button>
</form>
</div>
);
}