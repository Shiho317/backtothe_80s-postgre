import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { CgList } from 'react-icons/cg';

const EventManage = () => {
  const { currUser } = useContext(AppContext);
  const user = JSON.parse(currUser);
  const params = useParams();

  const [event, setEvent] = useState({});

  useEffect(() => {
    const eventsKey = {
      param: params.param2,
      email: user.email,
    };
    axios
      .post("http://localhost:8000/api/event/userevents-manage", eventsKey)
      .then((res) => {
        setEvent(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.email, params]);

  return (
    <div className="bg-manage-event bg-cover bg-center w-full h-screen flex items-center justify-center">
      <Link
        to={`/account/${user.id}`}
        className="absolute top-10 left-20 text-white text-5xl hover:text-red-500 cursor-pointer"
      >
        <IoMdArrowDropleftCircle />
      </Link>
      {event && (
        <div className="max-w-2xl m-auto bg-white/80 rounded-md overflow-hidden">
          <img src={event.image} alt="event-pic" />
          <div className="p-2">
            <h1 className="text-3xl underline text-center">{event.title}</h1>
            <div className="flex gap-4 items-center">
              <p>Desc: {event.sub}</p>{" "}
              <p className="text-gray-500 cursor-pointer hover:text-red-500">
                <MdEditNote />
              </p>{" "}
            </div>
            <div className="flex gap-4 items-center">
              <p>Date: {event.date}</p>
              <p className="text-gray-500 cursor-pointer hover:text-red-500">
                <MdEditNote />
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p>Start: {event.time}</p>
              <p className="text-gray-500 cursor-pointer hover:text-red-500">
                <MdEditNote />
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p>At: {event.location}</p>
              <p className="text-gray-500 cursor-pointer hover:text-red-500">
                <MdEditNote />
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p>Price: {event.price === 0 ? "free" : `C$ ${event.price}`}</p>{" "}
              <p className="text-gray-500 cursor-pointer hover:text-red-500">
                <MdEditNote />
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p>Participants: {event.amount} / {event.participants}</p>
              <p className="text-gray-500 cursor-pointer hover:text-red-500">
                <CgList />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManage;
