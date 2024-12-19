import React, { useEffect, useState } from "react";
// import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(progress);

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);
  return (
    <div className="w-[80%] mx-auto min-h-[80vh]">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-[#424242] text-white flex flex-col justify-center items-center w-[80%] lg:w-[30%] mx-auto rounded-md">
            Lecture completed - {completedLec} out of {lectLength} <br />
            <progress value={completed} max={100}></progress> {completed} %
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="w-[50%]">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <div className="mt-2">
                      <video
                        src={`${server}/${lecture.video}`}
                        className="w-[90%] mx-auto"
                        
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        onEnded={() => addProgress(lecture._id)}
                      ></video>
                      <h1 className="font-semibold text-lg">{lecture.title}</h1>
                      <h3>{lecture.description}</h3>
                    </div>
                  ) : (
                    <h1>Please Select a Lecture</h1>
                  )}
                </>
              )}
            </div>
            <div className="w-[50%] flex flex-col justify-center items-center gap-4 mt-2">
              {user && user.role === "admin" && (
                <button className="bg-[#48CFCB] text-[#424242] px-2 lg:px-5 py-2 rounded-md hover:scale-105 transition duration-150 mb-2" onClick={() => setShow(!show)}>
                  {show ? "Close" : "Add Lecture +"}
                </button>
              )}

              {show && (
                <div className=" bg-[#424242] flex flex-col items-center p-4 rounded-md w-full">
                  <h2 className="text-[#229799] font-semibold text-2xl py-2">Add Lecture</h2>
                  <form onSubmit={submitHandler} className="flex flex-col gap-5 text-white w-[80%] mx-auto">
                    <div className="flex flex-col">
                    <label htmlFor="text">Title</label>
                    <input
                      type="text"
                      value={title}
                      className="text-black"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    </div>
                    <div className="flex flex-col">
                    <label htmlFor="text">Description</label>
                    <input
                      type="text"
                      value={description}
                      className="text-black"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    </div>
                    <input
                      type="file"
                      placeholder="choose video"
                      className="text-white"
                      onChange={changeVideoHandler}
                      required
                    />

                    {videoPrev && (
                      <video
                        src={videoPrev}
                        alt=""
                        width={300}
                        controls
                      ></video>
                    )}

                    <button
                      disabled={btnLoading}
                      type="submit"
                      className="bg-[#48CFCB] text-[#424242] px-5 py-2 rounded-md hover:scale-105 transition duration-150 mt-2"
                    >
                      {btnLoading ? "Please Wait..." : "Add"}
                    </button>
                  </form>
                </div>
              )}

              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => {
                  return (
                    <>
                      <div
                        onClick={() => fetchLecture(e._id)}
                        key={i}
                        className={`border border-[#424242] text-[#424242] w-full rounded-md py-1 px-1 flex ${lecture._id === e._id && "active"}`}
                      >
                        {i + 1}. {e.title}{" "}
                        {progress[0] &&
                          progress[0].completedLectures.includes(e._id) && (
                            <span
                              style={{
                                
                                padding: "2px",
                                borderRadius: "6px",
                                color: "greenyellow",
                              }}
                            >
                              <TiTick />
                            </span>
                          )}
                      </div>
                      {user && user.role === "admin" && (
                        <button
                          className="bg-red-600 text-white  px-2 py-1 rounded-md"
                          style={{ background: "red" }}
                          onClick={() => deleteHandler(e._id)}
                        >
                          Delete {e.title}
                        </button>
                      )}
                    </>
                  );
                })
              ) : (
                <p className="text-2xl">No Lectures Yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecture;
