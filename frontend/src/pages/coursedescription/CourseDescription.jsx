import React, { useEffect, useState } from "react";
// import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async (amount) => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    // console.log(order.id);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "GyaanPath", //your business name
      description: "Learn with us",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          // toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          console.log(error);
          // toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded");
      return;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="h-[80vh] w-[80%] mx-auto flex flex-col gap-4 justify-center items-center">
              <div className="flex flex-col justify-center items-center bg-[#424242] rounded-md p-5 gap-6">
                <h2 className="text-2xl font-semibold text-[#48CFCB]">
                  {course.title}
                </h2>
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="w-[350px] rounded-md shadow-white"
                />
                <div className="flex flex-col justify-start items-center text-white text-lg">
                  <p>Instructor : {course.createdBy}</p>
                  <p>Duration : {course.duration} weeks</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <p>{course.description}</p>

                <p>Let's get started with course At ₹{course.price}</p>
              </div>
              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="bg-[#48CFCB] text-[#424242] px-5 py-2 rounded-md hover:scale-105 transition duration-150 mt-2"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => checkoutHandler(course.price)}
                  className="bg-[#48CFCB] text-[#424242] px-5 py-2 rounded-md hover:scale-105 transition duration-150 mt-2"
                >
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
