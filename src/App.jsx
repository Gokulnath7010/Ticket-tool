import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CreateTicket from "./components/CreateTicket";
import TicketView from "./components/TicketView"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateTicket />} />
        <Route path="/ticket/:id" element={<TicketView />} />
      </Routes>
    </BrowserRouter>
  );
}
