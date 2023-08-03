import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSave = Boolean(password) && Boolean(email);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();

    if (!data.success) {
      alert("Enter Valid Credentials");
    } else {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("authToken", data.authtoken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  return (
    <div className="container m-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group m-4">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group m-4">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={!canSave} className="btn btn-success">
          Submit
        </button>
        <Link to="/signup" className="m-3 btn btn-danger">
          New User
        </Link>
      </form>
    </div>
  );
};

export default Login;
