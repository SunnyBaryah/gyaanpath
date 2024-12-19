import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
// import "./dashboard.css";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div>
      <Layout>
        {stats.totalCoures?<div className="bg-[#424242] rounded-md p-10 ml-2 text-white flex flex-col gap-10">
            <h1 className="text-3xl font-semibold text-[#229799] text-center">Statistics</h1>
            <div className="flex flex-col justify-center items-center gap-4 text-lg">
            <p>{`Total Courses : ${stats.totalCoures}`}</p>
          
          
            <p>{`Total Lectures : ${stats.totalLectures}`}</p>
          
          
            <p>{`Total Users : ${stats.totalUsers}`}</p>
            </div>
        </div>:<div className="bg-[#424242] rounded-md p-10 ml-2 text-white flex flex-col gap-10">
            <h1 className="text-3xl font-semibold text-[#F5F5F5] text-center">Loading...</h1>
          </div>}
      </Layout>
    </div>
  );
};

export default AdminDashbord;
