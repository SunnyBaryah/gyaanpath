import React, { useEffect, useState } from "react";
// import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.mainrole !== "superadmin") return navigate("/");

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (confirm("are you sure you want to update this user role")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  console.log(users);
  return (
    <Layout>
      <div className="pl-2 flex flex-col justify-center items-center gap-5">
        <h1 className="font-semibold text-3xl text-[#229799]">All Users</h1>
        <h2 className="lg:hidden">Please use a bigger screen to view this</h2>
        <table className="hidden lg:block lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td scope="col" className="px-6 py-3">#</td>
              <td scope="col" className="px-6 py-3">name</td>
              <td scope="col" className="px-6 py-3">email</td>
              <td scope="col" className="px-6 py-3">role</td>
              <td scope="col" className="px-6 py-3"  >update role</td>
            </tr>
          </thead>

          {users &&
            users.map((e, i) => (
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{e.name}</td>
                  <td className="px-6 py-4">{e.email}</td>
                  <td className="px-6 py-4">{e.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => updateRole(e._id)}
                      className="bg-[#48CFCB] text-[#424242] px-2 py-1 rounded-md"
                    >
                      Update Role
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;
