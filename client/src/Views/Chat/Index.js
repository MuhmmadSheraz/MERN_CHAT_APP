import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import "./style.css";
let socket;
const Index = () => {
  const { name, room } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const ENDPOINT = "localhost:8000";
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("joinChat", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);
  useEffect(() => {
    socket.on("message", (message) => {
      console.log("messgae===.", message);
      setMessages((pre) => {
        return [...pre, message];
      });
    });
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();

    console.log(socket)
    if (messageBody) {
      socket.emit("sendMessage", messageBody, () => setMessageBody(""));
    }
  };
  return (
    <div className="d-flex justify-content-center items-center flex-column">
      <h2 className="text-center text-info">Chat Box</h2>

      <div className="chat_Box mx-auto">
        <div className="messages px-3 py-5">
          {messages?.map((message) => {
            return (
              <div className="text-left  d-flex items-center justify-content-start">
                <p className="mr-2">
                  {message.user.charAt(0).toUpperCase() + message.user.slice(1)}
                </p>
                <p className="message">{message.messageBody}</p>
              </div>
            );
          })}
        </div>
        <div className="inputBar d-flex ">
          <input
            value={messageBody}
            placeholder="Enter Your Message"
            className="mx-2"
            onChange={(e) => setMessageBody(e.target.value)}
          />
          <button className="btn btn-success mx-2" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
