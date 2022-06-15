import axios from "axios";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const NewEvent = ({ user, setOpenModal, getUserEvents }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventParticipants, setEvevntParticipants] = useState();
  const [eventPrice, setEventPrice] = useState();
  const [eventImage, setEventImage] = useState("");

  const addEventsHandler = async (e) => {
    e.preventDefault();

    const newEvent = {
      title: eventTitle,
      subtitle: eventDesc,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      participants: eventParticipants,
      price: eventPrice,
      image: eventImage,
      host: user.email,
    };

    await axios
      .post("/api/event/create", newEvent)
      .then((res) => {
        getUserEvents();
        setOpenModal(false);
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
      <form
        className="grid grid-rows-7 grid-cols-4 gap-2 w-11/12 md:w-2/3 lg:w-1/3 lg:p-3"
        onSubmit={addEventsHandler}
      >
        <label id="title" className="text-white">
          Title:
        </label>
        <input
          type="text"
          name="title"
          className="h-10 outline-none px-1 col-span-3"
          placeholder="Event Title"
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <label id="desc" className="text-white">
          Description:
        </label>
        <textarea
          type="text"
          name="desc"
          className="h-20 outline-none px-1 col-span-3"
          placeholder="Event Description"
          onChange={(e) => setEventDesc(e.target.value)}
          rows={10}
          cols={15}
        />
        <label id="date" className="text-white">
          Date:
        </label>
        <input
          type="date"
          name="date"
          className="h-10 outline-none px-1 col-span-1"
          onChange={(e) => setEventDate(e.target.value)}
        />
        <label id="time" className="text-white">
          Time:
        </label>
        <input
          type="time"
          name="time"
          className="h-10 outline-none px-1 col-span-1"
          onChange={(e) => setEventTime(e.target.value)}
        />
        <label id="location" className="text-white">
          Location:
        </label>
        <input
          type="text"
          name="location"
          className="h-10 outline-none px-1 col-span-3"
          placeholder="Event Location"
          onChange={(e) => setEventLocation(e.target.value)}
        />
        <label id="participants" className="text-white">
          Participants:
        </label>
        <input
          type="text"
          name="participants"
          className="h-10 outline-none px-1 col-span-1"
          onChange={(e) => setEvevntParticipants(e.target.value)}
        />
        <label id="price" className="text-white">
          Price:
        </label>
        <input
          type="number"
          name="price"
          className="h-10 outline-none px-1 col-span-1"
          placeholder="30 *Number(C$)"
          onChange={(e) => setEventPrice(e.target.value)}
        />
        <label id="image" className="text-white">
          Image:
        </label>
        <input
          type="url"
          name="image"
          className="h-10 outline-none px-1 col-span-3"
          placeholder="Image Url"
          onChange={(e) => setEventImage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-black w-1/2 mt-4 m-auto h-10 col-span-4 bg-none border border-black hover:bg-red-500"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default NewEvent;
