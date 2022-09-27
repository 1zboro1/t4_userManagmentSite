import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

function Register() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(e) {
    e.preventDefault();
    const repsonse = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await repsonse.json();
    console.log(data);
    if (data.status === "ok") {
      alert("Registration successfull");
      history("/login");
    } else {
      alert("Error. Duplicate email or wrong data");
    }
  }
  return (
    <div className="App">
      <Container>
        <h1 className="text-center mt-5">Register</h1>
        <Form onSubmit={registerUser}>
          <Row className="mb-3 mt-5">
            <Col md={{ span: 4, offset: 4 }}>
              <Form.Group controlId="nameInput">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
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
                  placeholder="Password"
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
              <Button type="submit">Register</Button>
            </Col>
          </Row>
        </Form>
        <Row className="mb-4 mt-2">
          <Col md={{ offset: 4 }}>
            <Link to="/login">
              <Button>Login page</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
