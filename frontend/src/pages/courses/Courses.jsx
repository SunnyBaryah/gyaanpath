import React from "react";
// import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  console.log(courses);
  return (
    <div className="bg-[#424242] w-[80%] mx-auto p-10 rounded-md flex flex-col justify-between items-center gap-10">
      <h2 className="text-[#48CFCB] text-2xl lg:text-6xl font-semibold">Available Courses</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
