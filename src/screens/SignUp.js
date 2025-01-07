import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
// import chefImage from "../components/imagereact/DALL·E 2024-11-10 13.28.18 - A cheerful chef character wearing a classic white chef's hat and apron, standing in a friendly pose with a welcoming smile. The chef has a warm and ap.webp"; // Updated path
export default function SignUp() {
  //   use fetch api ,inbuilt function
  //   synthetic event e.preventDefault();
  let navigate=useNavigate()
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handlesubmit =async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      location: credentials.geolocation
    }))
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      }),
    });
    const json = await response.json();
    console.log(json)
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
if(json.success){
  navigate("/login")
}
  };

  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row bg-success rounded shadow p-4">
        {/* Image Column */}
        {/* <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={chefImage} alt="Chef" className="img-fluid rounded" />
        </div> */}

        <div className="col-md-6 d-flex justify-content-center align-items-center">
        <form onSubmit={handlesubmit}>
        <h2 className="text-center mb-4">Signup</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onchange}
            />
          </div>
          <button type="submit" className=" m-3 btn btn-success">
            SignUp
          </button>
          <Link to="/login" className="m-3 btn btn-warning">
            Already a user
          </Link>
        </form>
        </div>
      </div>
      </div>

    </>
  );
}
