import axios from "axios";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const EditEvent = ({ setEditDetails, event, getEvent }) => {
  const [eventTitle, setEventTitle] = useState(event.title);
  const [eventDesc, setEventDesc] = useState(event.sub);
  const [eventDate, setEventDate] = useState(event.date);
  const [eventTime, setEventTime] = useState(event.time);
  const [eventLocation, setEventLocation] = useState(event.location);
  const [eventParticipants, setEvevntParticipants] = useState(
    event.participants
  );
  const [eventPrice, setEventPrice] = useState(event.price);
  const [eventImage, setEventImage] = useState(event.image);

  const editHandler = async (e) => {
    e.preventDefault();

    const editedEvent = {
      id: event.id,
      title: eventTitle,
      subtitle: eventDesc,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      participants: eventParticipants,
      price: eventPrice,
      image: eventImage,
    };

    await axios
      .post("http://localhost:8000/api/event/edit", editedEvent)
      .then((res) => {
        setEditDetails(false);
        getEvent()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-gray-400/70">
      <div
        className="absolute top-4 right-4 lg:top-28 lg:right-96 text-white text-5xl cursor-pointer"
        onClick={() => setEditDetails(false)}
      >
        <IoIosCloseCircle />
      </div>
      <form
        className="grid grid-rows-7 grid-cols-4 gap-2 w-11/12 md:w-2/3 lg:w-1/3 lg:p-3"
        onSubmit={editHandler}
      >
        <label id="title" className="text-white">
          Title:
        </label>
        <input
          type="text"
          name="title"
          className="h-10 outline-none px-1 col-span-3"
          placeholder="Event Title"
          value={eventTitle}
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
          value={eventDesc}
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
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <label id="time" className="text-white">
          Time:
        </label>
        <input
          type="time"
          name="time"
          className="h-10 outline-none px-1 col-span-1"
          value={eventTime}
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
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
        <label id="participants" className="text-white">
          Participants:
        </label>
        <input
          type="text"
          name="participants"
          className="h-10 outline-none px-1 col-span-1"
          value={eventParticipants}
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
          value={eventPrice}
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
          value={eventImage}
          onChange={(e) => setEventImage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-black w-1/2 mt-4 m-auto h-10 col-span-4 bg-none border border-black hover:bg-red-500"
        >
          Edit Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
