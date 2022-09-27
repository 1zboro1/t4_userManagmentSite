import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

async function updateDate() {
  const time = new Date().toLocaleString();
  await fetch("http://localhost:8080/api/dashboard", {
    method: "POST",
    headers: {
      "Content-Type": "application.json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      lastLogin: time,
    }),
  });
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function loginUser(e) {
    e.preventDefault();
    const repsonse = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await repsonse.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      updateDate();
      alert("Login successful");
      window.location.href = "/dashboard";
    } else {
      alert("Login failed. Check your name and email. If data is good You may be banned");
    }
    console.log(data);
  }

  return (
    <div className="App">
      <Container>
        <h1 className="text-center mt-5">Login</h1>
        <Form onSubmit={loginUser}>
          <Row className="mb-3 mt-5">
            <Col md={{ span: 4, offset: 4 }}>
              <Form.Group controlId="emailInput">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Form.Group controlId="passwordInput">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4 mt-2">
            <Col md={{ offset: 4 }}>
              <Button type="submit">Login</Button>
            </Col>
          </Row>
        </Form>
        <Row className="mb-4 mt-2">
          <Col md={{ offset: 4 }}>
            <Link to="/register">
              <Button>Register page</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
