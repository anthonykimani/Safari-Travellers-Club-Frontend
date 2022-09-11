import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";

const Schedules = ({ usersLogin, credentials, setCredentials }) => {
  const [schedules, setSchedules] = useState([]);
  const [booked, setBooked] = useState(true);

  //fetch schedule from server
  useEffect(() => {
    fetch("https://safari-travelers-server.herokuapp.com/schedules")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSchedules(data);
      });
  }, [booked]);

  //filter schedules to return schedules matching specific user
  const userSchedules = schedules.filter((element) => {
    console.log(credentials);
    return element.user_id == credentials.id;
  });

  console.log(userSchedules);

  function handleCancel(id) {
    setBooked(false)
    fetch(`https://safari-travelers-server.herokuapp.com/schedules/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <>
      <Navbar credentials={credentials} setCredentials={setCredentials} />
      <div className="bg-indigo-50 flex flex-col items-center">
        {userSchedules.map((element) => {
          return (
            <div className="flex flex-col bg-white p-5 m-5 rounded-md text-gray-700">
              <h1 className="text-2xl py-2 font-bold">
                {element.destination.name}
              </h1>
              <hr className="w-full bg-gray-400" />
              <h4 className="text-xl py-2 font-medium">
                {element.destination.location}
              </h4>
              <img
                src={element.destination.image}
                alt=""
                className="rounded sm:h-[350px] sm:w-[600px] "
              />
              <h3 className="text-xl py-5 font-bold">
                Safari Scheduled for {element.day} at {element.time}{" "}
              </h3>
              <hr className="w-full bg-gray-400" />
              <h3 className="text-xl py-5 font-bold">
                <span className="text-gray-800">
                  ${element.destination.price}{" "}
                </span>
                per trip
              </h3>
              <div className="flex justify-between flex-col sm:flex-row sm:w-[500px] w-[200px]">
                <button
                  className="w-[150px] my-5 text-white bg-red-500 hover:bg-red-700 px-1 xsm:px-5 py-2 font-bold xxs:text-xs xsm:text-sm"
                  onClick={() => handleCancel(element.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Schedules;
