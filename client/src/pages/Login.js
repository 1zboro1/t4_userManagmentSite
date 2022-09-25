import { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  async function loginUser(e) {
    e.preventDefault();
    const repsonse = await fetch("http://localhost:1337/api/login", {
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
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      window.location.href = "/dashboard";
    } else {
      alert("Login failed. Check your name and email");
    }
    console.log(data);
  }
  // async function updateDate(e) {
  //   e.preventDefault();
  //   await fetch("http://localhost:1337/api/dashboard", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application.json",
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({
  //       lastLogin: Date.now(),
  //     }),
  //   });
  // }
  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default Login;
