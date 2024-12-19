import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };
  return (
    <div className="h-[80vh] w-[80%] mx-auto flex justify-center items-center">
      <div className="flex flex-col items-center bg-[#424242] p-10 rounded-md text-white">
        <h2 className="text-2xl text-[#229799]">Register</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 py-2">
          <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            className="text-black"
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            className="text-black"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            className="text-black"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
          <button type="submit" disabled={btnLoading} className="bg-[#48CFCB] text-[#424242] px-5 py-2 rounded-md hover:scale-105 transition duration-150 mt-2">
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>
        <p>
          have an account? <Link to="/login" className="text-[#48CFCB]">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
