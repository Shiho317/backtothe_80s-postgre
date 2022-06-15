import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import UserEvent from "./UserEvent";
import { MdPostAdd } from "react-icons/md";
import NewEvent from "./NewEvent";

const Account = () => {
  const { myStorage } = useContext(AppContext);
  const [userEvents, setUserEvents] = useState([]);
  
  const currUser = myStorage.getItem("user");
  const user = JSON.parse(currUser);

  const getUserEvents = async () => {
    await axios
      .post("http://localhost:8000/api/event/userevents", user)
      .then((res) => {
        setUserEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserEvents();
    // eslint-disable-next-line
  }, [currUser]);

  const navigate = useNavigate();

  const logoutHandler = () => {
    myStorage.removeItem("user");
    navigate("/");
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative pt-4 bg-account-bg bg-cover bg-center w-full h-screen flex flex-col items-center">
      {user && (
        <h1 className="text-center text-2xl px-2 m-2 text-white lg:text-5xl">
          {user.name}'s Hosting Events
        </h1>
      )}
      <ul className="flex flex-col items-center justify-start w-full h-3/4 gap-4 overflow-y-auto md:flex-row md:flex-wrap md:mt-4 md:items-start md:p-4">
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <UserEvent event={event} user={user} key={event.id} />
          ))
        ) : (
          <p className="text-white">Your hosting events are empty.</p>
        )}
      </ul>
      <div className="absolute gap-2 bottom-2 right-2 flex flex-col justify-center lg:gap-6 lg:top-1/2 lg:-translate-y-1/2 lg:right-10">
        <button
          className="bg-none border border-black bg-white py-2 w-10 text-xl hover:bg-red-500 flex justify-center"
          onClick={() => setOpenModal(true)}
        >
          <MdPostAdd />
        </button>
        <button
          className="bg-none border border-black bg-white py-1 w-24 text-lg lg:text-xl hover:bg-red-500 lg:py-2 lg:w-36"
          onClick={logoutHandler}
        >
          Log Out
        </button>
        <Link to="/">
          <button className="bg-none border border-black bg-white py-1 w-24 text-lg lg:text-xl hover:bg-red-500 lg:py-2 lg:w-36">
            Home
          </button>
        </Link>
      </div>
      {openModal && (
        <NewEvent
          user={user}
          setOpenModal={setOpenModal}
          getUserEvents={getUserEvents}
        />
      )}
      
    </div>
  );
};

export default Account;
