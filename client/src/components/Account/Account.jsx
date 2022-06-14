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
      <ul className="mt-4 flex flex-col gap-6 lg:flex-row flex-wrap">
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <UserEvent event={event} user={user} key={event.id} />
          ))
        ) : (
          <p className="text-white">Your hosting events are empty.</p>
        )}
      </ul>
      <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col justify-center gap-6">
        <button
          className="bg-none border border-black bg-white py-2 w-10 text-xl hover:bg-red-500 flex justify-center"
          onClick={() => setOpenModal(true)}
        >
          <MdPostAdd />
        </button>
        <button
          className="bg-none border border-black bg-white py-2 w-36 text-xl hover:bg-red-500"
          onClick={logoutHandler}
        >
          Log Out
        </button>
        <Link to="/">
          <button className="bg-none border border-black bg-white py-2 w-36 text-xl hover:bg-red-500">
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
