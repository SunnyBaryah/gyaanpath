import React from "react";
// import "./common.css";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";

const Sidebar = ({className}) => {
  const { user } = UserData();
  return (
    <div className={`${className} text-[#229799] border border-t-[#F5F5F5] border-l-[#F5F5F5] border-b-[#F5F5F5]  border-r-[#229799]`}>
      <ul>
        <li>
          <Link to={"/admin/dashboard"} className="flex items-center gap-2 hover:bg-[#407e80] hover:text-[#F5F5F5] px-2 py-2">
            <div className="icon">
              <AiFillHome />
            </div>
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to={"/admin/course"} className="flex items-center gap-2 hover:bg-[#407e80] hover:text-[#F5F5F5]  px-2 py-2">
            <div className="icon">
              <FaBook />
            </div>
            <span>Courses</span>
          </Link>
        </li>

        {user && user.mainrole === "superadmin" && (
          <li>
            <Link to={"/admin/users"} className="flex items-center gap-2 hover:bg-[#407e80] hover:text-[#F5F5F5] px-2 py-2">
              <div className="icon">
                <FaUserAlt />
              </div>
              <span>Users</span>
            </Link>
          </li>
        )}

        <li>
          <Link to={"/account"} className="flex items-center gap-2 hover:bg-[#407e80] hover:text-[#F5F5F5] px-2 py-2">
            <div className="icon">
              <AiOutlineLogout />
            </div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
