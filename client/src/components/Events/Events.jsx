import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/event/events").then((res) => {
      setEventsData(res.data);
    });
  }, []);

  return (
    <div className="bg-events-bg bg-cover bg-center w-full h-screen flex flex-col items-center">
      <div className="my-4">
        <h1 className="text-center text-2xl px-2 text-white lg:text-5xl">Up Coming Events</h1>
      </div>
      <ul className="mt-4 flex flex-col gap-6 lg:flex-row flex-wrap">
        {eventsData.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </ul>
    </div>
  );
};

export default Events;
