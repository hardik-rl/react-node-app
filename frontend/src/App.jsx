import PaymentList from "./components/Payment";
import DonationCard from "./components/DonationCard";
import ResponsiveAppBar from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Chat from "./components/Chat";
import { ChatProvider } from "./context/ChatContext";
import { useAuth } from "./context/AuthContext";
import Register from "./auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./components/Users";

function App() {
  const { user } = useAuth();

  return (
    <ChatProvider>
      <div style={{ padding: "20px", textAlign: "center", }}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="*" element={<Navigate to="/" />} />

          {/* Private Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/price" element={<PaymentList />} />
            <Route path="/donation" element={<DonationCard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/user" element={<Users />} />
          </Route>

        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App;
