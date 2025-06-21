import PaymentList from "./components/Payment";
import DonationCard from "./components/DonationCard";
import ResponsiveAppBar from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Chat from "./components/Chat";
import { ChatProvider } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import Register from "./auth/Register";

function App() {
  const { user } = useAuth();

  return (
    <ChatProvider>
      <div style={{ padding: "20px", textAlign: "center", }}>
        <ResponsiveAppBar />
        <Routes>
          {/* <Route path="/" element={<Home />} />
            <Route path="/price" element={<PaymentList />} />
            <Route path="/donation" element={<DonationCard />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* {user ? <Chat /> : <Login />} */}
          <Route path="/register" element={<Register />} />

          <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />

          {/* Show login page if not authenticated */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

          {/* Optional fallback */}
          <Route path="*" element={<Navigate to="/" />} />

          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App;
