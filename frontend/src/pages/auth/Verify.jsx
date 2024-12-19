import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
// import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };
  return (
    <div className="h-[80vh] w-[80%] mx-auto flex justify-center items-center">
      <div className="flex flex-col items-center bg-[#424242] p-10 rounded-md text-white">
        <h2 className="text-2xl text-[#229799]">Verify Account</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 py-2">
          <div className="flex flex-col">
            <label htmlFor="otp">Otp</label>
            <input
              type="number"
              value={otp}
              className="text-black"
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          {/* <ReCAPTCHA
            sitekey=" 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
          /> */}
          ,
          <button disabled={btnLoading} type="submit" className="bg-[#48CFCB] text-[#424242] px-5 py-2 rounded-md hover:scale-105 transition duration-150 mt-2">
            {btnLoading ? "Please Wait..." : "Verify"}
          </button>
        </form>
        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;
