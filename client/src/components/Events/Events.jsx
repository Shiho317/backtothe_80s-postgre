import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    axios.get("/api/event/events").then((res) => {
      setEventsData(res.data);
    });
  }, []);

  return (
    <div className="bg-events-bg bg-cover bg-center w-full h-screen flex flex-col items-center">
      <div className="my-4">
        <h1 className="text-center text-2xl px-2 text-white lg:text-5xl">
          Up Coming Events
        </h1>
      </div>
      <ul className="flex flex-col items-center justify-start w-full h-3/4 gap-4 overflow-y-auto md:flex-row md:flex-wrap md:mt-4 md:items-start md:p-4">
        {eventsData.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </ul>
      <div className="fixed gap-2 bottom-2 right-2 flex flex-col justify-center lg:gap-6 lg:top-1/2 lg:-translate-y-1/2 lg:right-10">
        <Link to="/login">
          <button className="bg-none border border-black bg-white py-1 w-24 text-lg lg:text-xl hover:bg-red-500 lg:py-2 lg:w-36">
            Host
          </button>
        </Link>
        <Link to="/">
          <button className="bg-none border border-black bg-white py-1 w-24 text-lg lg:text-xl hover:bg-red-500 lg:py-2 lg:w-36">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Events;
