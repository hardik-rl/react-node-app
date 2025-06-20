import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useChat } from "../../hook/ChatContext";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [user, setUser] = useState("User1");
  const [message, setMessage] = useState("");
  const { messages, addMessage } = useChat();


  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      addMessage(data);
    });

    return () => socket.off("receive_message");
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
      <Button variant="contained" onClick={sendMessage} style={{ padding: "10px", marginLeft: 10 }}>Send</Button>
    </div>
  );
};

export default Chat;
