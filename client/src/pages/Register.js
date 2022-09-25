import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  async function registerUser(e) {
    e.preventDefault();
    const repsonse = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
    const data = await repsonse.json();
    console.log(data);
    if (data.status === "ok") {
      history("/login");
    }
  }
  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input type="submit" value="Register" />
      </form>
      <Link to="/login">
        <button>Login page</button>
      </Link>
    </div>
  );
}

export default Register;
