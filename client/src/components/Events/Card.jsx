import React, { useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Card = ({ data }) => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const today = `${year}-${month}-${date}`;

  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const eventDay = new Date(data.date);
    const nowDate = new Date(today);
    if (nowDate > eventDay) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  }, [today, data]);

  return (
    <div className="relative w-11/12 m-auto shadow-md rounded overflow-hidden bg-white lg:w-80">
      {<img src={data.image} alt="event" /> || <Skeleton />}
      <div className="p-2">
        <h1 className="text-xl underline">{data.title}</h1>
        <p className="text-sm">{data.sub}</p>
        <p className="text-sm text-gray-400">{data.amount} people join</p>
      </div>
      <Link
        to={`/events-data/${data.id}`}
        className="absolute bottom-2 right-2 text-gray-400"
      >
        <button className="text-xl bg-none border-none hover:text-red-500 lg:text-2xl">
          <BiMessageSquareDetail />
        </button>
      </Link>
      {isPassed && (
        <div className="absolute top-0 left-0 w-full h-full rounded bg-gray-800/50 flex items-center justify-center">
          <h3 className="text-white text-3xl">CLOSED</h3>
        </div>
      )}
    </div>
  );
};

export default Card;
