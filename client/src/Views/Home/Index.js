import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function Index() {
  const [username, setUsername] = useState("ali ");
  const [room, setRoom] = useState("bn");
  const history = useHistory();

  const handleSubmit = () => {
    console.log(username, room);
    history.push(`/chat/${username}/${room}`);
  };
  return (
    <div>
      <h3 className="text-center text-success ">MERN Chat App</h3>
      {/* Form */}
      <div className="container">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Room</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Room "
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Index;
