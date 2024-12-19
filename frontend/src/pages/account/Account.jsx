import React from "react";
import { MdDashboard } from "react-icons/md";
// import "./account.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };
  return (
    <div className="h-[80vh] w-[80%] mx-auto rounded-md p-4 bg-[#424242]">
      {user && (
        <div className="flex flex-col justify-center items-center gap-16">
          <h2 className="text-5xl text-[#48CFCB] font-semibold">My Profile</h2>
          <div className=" bg-[#F5F5F5] p-5 rounded-md flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1>
                <span className="font-semibold">Name : </span><span>{user.name}</span>
              </h1>

              <h1>
                <span className="font-semibold">Email : </span><span>{user.email}</span>
              </h1>
            </div>
            <div className="w-full flex flex-col gap-3">
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="flex gap-2 justify-center items-center bg-[#229799] rounded-md py-2 hover:scale-105 transition duration-150"
              >
                <MdDashboard />
                Dashboard
              </button>



              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="flex gap-2 justify-center items-center bg-[#48CFCB] rounded-md py-2 hover:scale-105 transition duration-150"
                >
                  <MdDashboard />
                  Admin Dashboard
                </button>
              )}



              <button
                onClick={logoutHandler}
                className="text-white bg-red-600 flex justify-center items-center rounded-md py-2 hover:scale-105 transition duration-150"
              >
                <IoMdLogOut />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
