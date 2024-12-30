import React from "react";
// import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";
import coverpic from "/onepic.jpg";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className=" bg-[#F5F5F5] rounded-md py-4 px-2 flex flex-col justify-center items-center gap-5">
      <img src={coverpic} alt="" className="w-[100%] h-[120px] mx-auto rounded-md" />
      <h3 className="font-semibold text-2xl text-center">{course.title}</h3>
      <div className="flex flex-col gap-1 items-center justify-center">
        <p>Instructor- {course.createdBy}</p>
        <p>Duration- {course.duration} weeks</p>
        <p>Price- ₹{course.price}</p>
      </div>
      <div className="flex flex-wrap gap-4 w-full justify-center">
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="bg-[#48CFCB] px-5 py-2 rounded-md hover:scale-105 transition duration-150"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="bg-[#48CFCB] px-5 py-2 rounded-md hover:scale-105 transition duration-150"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="bg-[#48CFCB] px-5 py-2 rounded-md hover:scale-105 transition duration-150"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="bg-[#48CFCB] px-5 py-2 rounded-md hover:scale-105 transition duration-150">
          Get Started
        </button>
      )}


      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="px-5 py-2 rounded-md bg-red-600 text-white hover:scale-105 transition duration-150"
        >
          Delete
        </button>
      )}
      </div>
    </div>
  );
};

export default CourseCard;
