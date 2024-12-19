import React, { useState } from "react";
// import "./auth.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot`, { email });

      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  return (
    <div className="h-[80vh] w-[80%] mx-auto flex justify-center items-center">
      <div className="flex flex-col items-center bg-[#424242] p-10 rounded-md text-white">
        <h2 className="text-2xl text-[#229799]">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-2">
          <div className="flex flex-col">
            <label htmlFor="text">Enter Email</label>
            <input
              type="email"
              value={email}
              className="text-black"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button disabled={btnLoading} className="bg-[#48CFCB] text-[#424242] px-5 py-2 rounded-md hover:scale-105 transition duration-150 mt-2">
            {btnLoading ? "Please Wait..." : "Send Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;