import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { GiPartyPopper } from "react-icons/gi";
import JoinForm from "./JoinForm";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Desc = () => {
  const params = useParams();
  const [event, setEvent] = useState([]);

  const getEventInfo = async() => {
    const clickedEvent = {
      id: params.id,
    };
    await axios
      .post("http://localhost:8000/api/event/getevent", clickedEvent)
      .then((res) => {
        setEvent(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getEventInfo()
    // eslint-disable-next-line
  }, [params]);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-manage-event bg-cover bg-center w-full h-screen flex items-center justify-center">
      <Link
        to="/events"
        className="absolute top-10 left-20 text-white text-5xl hover:text-red-500 cursor-pointer"
      >
        <IoMdArrowDropleftCircle />
      </Link>
      {event && (
        <div className="relative max-w-2xl m-auto bg-white/80 rounded-md overflow-hidden">
          {<img src={event.image} alt="event-pic" /> || <Skeleton />}
          <div className="p-2">
            <h1 className="text-3xl underline text-center">{event.title}</h1>
            <p>Desc: {event.sub}</p>
            <p>Date: {event.date}</p>
            <p>Start: {event.time}</p>
            <p>At: {event.location}</p>
            <p>Price: {event.price === 0 ? "free" : `C$ ${event.price}`}</p>
            <p>
              Participants: {event.amount} / {event.participants}
            </p>
          </div>
          <div
            className="absolute bottom-4 right-4 text-xl flex items-center justify-center gap-2 border border-black px-2 cursor-pointer hover:bg-red-500"
            onClick={() => setOpenModal(true)}
          >
            <p>JOIN</p>
            <GiPartyPopper />
          </div>
        </div>
      )}
      {openModal && event && <JoinForm setOpenModal={setOpenModal} event={event} getEventInfo={getEventInfo} />}
    </div>
  );
};

export default Desc;
