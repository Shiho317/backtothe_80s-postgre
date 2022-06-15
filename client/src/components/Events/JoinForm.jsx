import axios from "axios";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const JoinForm = ({ setOpenModal, event, getEventInfo }) => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const joinHandler = async (e) => {
    e.preventDefault();

    const joinInfo = {
      username,
      useremail: userEmail,
      event: event.id,
      amount: event.amount + 1
    };

    await axios
      .post("http://localhost:8000/api/people/join", joinInfo)
      .then((res) => {
        setOpenModal(false);
        getEventInfo()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-gray-400/70">
      <div
        className="absolute top-4 right-4 lg:top-28 lg:right-96 text-white text-5xl cursor-pointer"
        onClick={() => setOpenModal(false)}
      >
        <IoIosCloseCircle />
      </div>
      <form className="flex flex-col gap-2 w-11/12 md:w-2/3 lg:w-1/3 lg:p-3" onSubmit={joinHandler}>
        <label id="event" className="text-white">Event Title:</label>
        <h3 className="h-10 px-1 text-lg flex items-center bg-gray-200/50">{event.title}</h3>
        <label id="username" className="text-white">User Name:</label>
        <input
          type="text"
          name="username"
          className="h-10 outline-none px-1"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label id="useremail" className="text-white">User Email:</label>
        <input
          type="text"
          name="useremail"
          className="h-10 outline-none px-1"
          placeholder="User Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-black w-1/2 mt-4 m-auto h-10 col-span-4 bg-none border border-black hover:bg-red-500"
        >
          Join Event
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
