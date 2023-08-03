import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const canSave = Boolean(name) && Boolean(password) && Boolean(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        location,
      }),
    });
    // if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    console.log(response);
    if (response.status === 400) {
      alert("enter valid credentials");
    } else if (response.status === 409) {
      alert("User already exists");
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
          <label htmlFor="exampleName1">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            id="exampleInputName1"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="form-group m-4">
          <label htmlFor="exampleInputAddress1">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            id="exampleInputAddress1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit" disabled={!canSave} className="btn btn-success">
          Submit
        </button>
        <Link to="/Login" className="m-3 btn btn-danger">
          Already a User
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
