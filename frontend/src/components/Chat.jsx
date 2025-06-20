import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [user, setUser] = useState("User1");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, []);
  const sendMessage = () => {
    if (message.trim()) {
      const msgData = { sender: user, text: message };
      socket.emit("send_message", msgData);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Chat App</h2>
      <select onChange={(e) => setUser(e.target.value)} value={user}>
        <option>User1</option>
        <option>User2</option>
      </select>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", margin: "10px 0", padding: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.sender === user ? "right" : "left",
            background: msg.sender === user ? "#DCF8C6" : "#FFF",
            margin: "5px 0",
            padding: "8px",
            borderRadius: "8px"
          }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px" }}>Send</button>
    </div>
  );
};

export default Chat;
