import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiListSettingsLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserEvent = ({ event, user }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/events-manage/${user.id}/${event.id}`);
  };

  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const today = `${year}-${month}-${date}`;
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const eventDay = new Date(event.date);
    const nowDate = new Date(today);
    if (nowDate > eventDay) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  }, [today, event]);

  return (
    <div className="relative w-11/12 m-auto shadow-md rounded overflow-hidden bg-white lg:w-80">
      {<img src={event.image} alt="event" /> || <Skeleton />}
      <div className="p-2">
        <h1 className="text-xl underline">{event.title}</h1>
        <p className="text-sm">{event.sub}</p>
        <p className="text-sm text-gray-400">{event.amount} people join</p>
      </div>
      <div className="absolute bottom-2 right-2 text-gray-400">
        <button
          className="text-xl bg-none border-none hover:text-black lg:text-2xl"
          onClick={onClickHandler}
        >
          <RiListSettingsLine />
        </button>
      </div>
      {isPassed && (
        <div className="absolute top-0 left-0 w-full h-full rounded bg-gray-800/50 flex items-center justify-center">
          <h3 className="text-white text-3xl">CLOSED</h3>
        </div>
      )}
    </div>
  );
};

export default UserEvent;
