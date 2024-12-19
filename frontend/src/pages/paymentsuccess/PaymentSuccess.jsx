import React from "react";
import "./paymentsuccess.css";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  return (
    <div className="flex w-full h-[80vh] justify-center items-center">
      {user && (
        <div className="bg-[#424242] px-5 py-5 rounded-md flex flex-col justify-center items-center gap-5 text-white">
          <h2 className="text-2xl font-semibold">Payment successful</h2>
          <p>Your course subscription has been activated</p>
          <p>Reference no - {params.id}</p>
          <Link to={`/${user._id}/dashboard`} className="text-[#48CFCB] px-3 py-1 rounded-md">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
