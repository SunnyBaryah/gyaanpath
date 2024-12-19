import React, { useEffect } from "react";
// import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  return (
    <>
      {course && (
        <div className="h-[80vh] w-[80%] mx-auto flex justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-[#424242] rounded-md p-5 gap-6">
            <h2 className="text-2xl lg:text-4xl font-semibold text-[#48CFCB]">{course.title}</h2>
            <img src={`${server}/${course.image}`} alt="" className="w-[350px] rounded-md shadow-white" />
            <div className="flex flex-col justify-start items-center text-white text-lg">
              <h4 className="text-center">{course.description}</h4>
              <h5>by - {course.createdBy}</h5>
              <h5>Duration - {course.duration} weeks</h5>
            </div>
              <Link className="bg-[#48CFCB] px-3 py-2 rounded-md hover:scale-105 transition duration-150 text-lg" to={`/lectures/${course._id}`}>
                <h2>Lectures</h2>
              </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
