import { Button } from "@mui/material";
// import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useChat } from "../../context/ChatContext";

import { useEffect } from "react";
import { useState } from "react";

const socket = io("http://localhost:5000");

// const Chat = () => {
//   const [user, setUser] = useState("User1");
//   const [message, setMessage] = useState("");
//   const { messages, addMessage } = useChat();


//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       addMessage(data);
//     });

//     return () => socket.off("receive_message");
//   }, []);

//   useEffect(() => {
//     socket.on("chat_history", (messages) => {
//       setMessage(messages);
//     });

//     socket.on("receive_message", (newMessage) => {
//       setMessage((prev) => [...prev, newMessage]);
//     });
//   }, []);



//   const sendMessage = () => {
//     if (message.trim()) {
//       const msgData = { sender: user, text: message };
//       socket.emit("send_message", msgData);
//       setMessage("");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
//       <h2>Chat App</h2>
//       <select onChange={(e) => setUser(e.target.value)} value={user}>
//         <option>User1</option>
//         <option>User2</option>
//       </select>
//       <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", margin: "10px 0", padding: "10px" }}>
//         {messages.map((msg, idx) => (
//           <div key={idx} style={{
//             textAlign: msg.sender === user ? "right" : "left",
//             background: msg.sender === user ? "#DCF8C6" : "#FFF",
//             margin: "5px 0",
//             padding: "8px",
//             borderRadius: "8px"
//           }}>
//             <strong>{msg.sender}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         style={{ width: "80%", padding: "10px" }}
//       />
//       <Button variant="contained" onClick={sendMessage} style={{ padding: "10px", marginLeft: 10 }}>Send</Button>
//     </div>
//   );
// };

// export default Chat;

const Chat = () => {
  const [user, setUser] = useState("User1");
  const [input, setInput] = useState(""); // for the input box
  const { messages, addMessage, setMessages } = useChat(); // make sure you have setMessages in your context

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // useEffect(() => {
  //   socket.on("chat_history", (history) => {
  //     console.log(history, "history");

  //     setMessages(history); // update full message history in context
  //   });

  //   socket.on("receive_message", (newMessage) => {
  //     addMessage(newMessage); // add new message to the list
  //   });

  //   return () => {
  //     socket.off("chat_history");
  //     socket.off("receive_message");
  //   };
  // }, []);

  useEffect(() => {
  // 1. Load previous messages from backend
  const loadMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/messages");
      const data = await res.json();
      setMessages(data); // replace with your state handler
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  loadMessages();

  // 2. Setup socket listeners
  socket.on("chat_history", (history) => {
    console.log("Received empty history:", history);
    setMessages(history); // likely []
  });

  socket.on("receive_message", (newMessage) => {
    addMessage(newMessage); // push to context or state
  });

  return () => {
    socket.off("chat_history");
    socket.off("receive_message");
  };
}, []);


  const sendMessage = () => {
    if (input.trim()) {
      const msgData = { sender: user, text: input };
      socket.emit("send_message", msgData);
      setInput("");
    }
  };

  const clearChat = async () => {
    console.log("delete");
    try {

      const res = await fetch("http://localhost:5000/clear-messages", {
        method: "DELETE"
      });

      const data = await res.json();
      if (data.success) {
        console.log("Chat history cleared");
      }
    } catch (err) {
      console.error("Error clearing chat:", err);
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
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "80%", padding: "10px" }}
      />
      <Button variant="outlined" onClick={clearChat} style={{ marginTop: 10 }}>
        Clear Chat History
      </Button>
      <Button variant="contained" onClick={sendMessage} style={{ padding: "10px", marginLeft: 10 }}>Send</Button>
    </div>
  );
};

export default Chat;