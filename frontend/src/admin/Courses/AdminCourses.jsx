import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col justify-center items-center px-4 gap-6">
          <h1 className="font-semibold text-3xl text-[#229799]">All Courses</h1>
          <div className="flex flex-col lg:flex-row bg-[#424242] rounded-md gap-6 p-4 w-full">
            {courses && courses.length > 0 ? (
              courses.map((e) => {
                return (<CourseCard key={e._id} course={e} />);
              })
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

        <div className="mt-5 lg:mt-6">
          <div className="add-course">
            <div className="flex flex-col bg-[#424242] text-[#F5F5F5] p-4 rounded-md">
              <h2 className="text-2xl text-center font-semibold text-[#229799]">Add Course</h2>
              <form onSubmit={submitHandler} className="flex flex-col">
                <label htmlFor="text">Title</label>
                <input
                  type="text"
                  value={title}
                  className="rounded-sm text-black"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label htmlFor="text">Description</label>
                <input
                  type="text"
                  value={description}
                  className="rounded-sm text-black"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <label htmlFor="text">Price</label>
                <input
                  type="number"
                  value={price}
                  className="rounded-sm text-black"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <label htmlFor="text">createdBy</label>
                <input
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  className="rounded-sm text-black"
                  required
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={""}>Select Category</option>
                  {categories.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>

                <label htmlFor="text">Duration</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="rounded-sm text-black"
                  required
                />

                <input type="file" required onChange={changeImageHandler} className="mt-2 rounded-sm" />
                {imagePrev && <img src={imagePrev} alt="" width={300} />}

                <button
                  type="submit"
                  disabled={btnLoading}
                  className="bg-[#48CFCB] text-[#424242] px-5 py-2 rounded-md hover:scale-105 transition duration-150 mt-2"
                >
                  {btnLoading ? "Please Wait..." : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
