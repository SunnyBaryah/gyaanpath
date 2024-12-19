import React from "react";
// import "./testimonials.css";

export const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "Selena Warner",
      position: "Student",
      message:
        "I am glad this platform exists. The courses are fun and the instructors are helpful.",
      image:
        "https://img.freepik.com/free-photo/portrait-young-student-happy-be-back-university_23-2148586577.jpg",
    },
  ];
  return (
    <section className="bg-[#424242] rounded-md p-6 mb-6">
      <h2 className="text-4xl text-center font-semibold text-[#48CFCB] mb-4">What our students say</h2>
      <div className="flex flex-col lg:flex-row justify-center items-center">
        {testimonialsData.map((e) => (
          <div className="w-[80%] lg:w-[33%] bg-[#48CFCB] rounded-md p-4 m-4 flex flex-col gap-4 justify-center items-center hover:scale-105 transition duration-200" key={e.id}>
            <div className="student-image">
              <img className="w-[] h-[20vh] rounded-md shadow-xl" src={e.image} alt="" />
            </div>
            <p className="text-md leading-tight">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="text-center font-semibold">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
