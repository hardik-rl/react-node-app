import PaymentList from "./components/Payment";
import DonationCard from "./components/DonationCard";
import ResponsiveAppBar from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home  from "./components/Home";
import Login  from "./auth/Login";
import Chat from "./components/Chat";

function App() {
  return (
    <div style={{ padding: "20px", textAlign: "center", }}>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/price" element={<PaymentList />} />
        <Route path="/donation" element={<DonationCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
