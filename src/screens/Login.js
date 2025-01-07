import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import chefImage from "../components/imagereact/DALL·E 2024-11-10 13.28.18 - A cheerful chef character wearing a classic white chef's hat and apron, standing in a friendly pose with a welcoming smile. The chef has a warm and ap.webp"; // Updated path

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row bg-success rounded shadow p-4">
        {/* Image Column */}
        {/* <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={chefImage} alt="Chef" className="img-fluid rounded" />
        </div> */}

        {/* Form Column */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
  {/* <h1>FoOrd</h1> */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
              <div className="form-text">We'll never share your email.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">
              Login
            </button>
            <Link to="/createuser" className="btn btn-warning w-100 mt-2">
              I am a new user
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
