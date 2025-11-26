import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compare/:userId" element={<Compare />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </div>
  );
}