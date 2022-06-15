import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Home = () => {
  const { myStorage } = useContext(AppContext);
  const currUser = myStorage.getItem("user");
  const user = JSON.parse(currUser);

  return (
    <div className="bg-home-bg w-full h-screen flex items-center justify-center">
      <h1 className="text-7xl text-white bg-black lg:text-8xl">BACK TO THE 80'S</h1>
      <div className="absolute top-2/3 right-2 gap-2 flex flex-col items-center justify-center lg:gap-6 lg:top-50 lg:right-10">
        <Link to={currUser === null ? "/login" : `/account/${user.id}`}>
          <button className="bg-none border border-black bg-white py-1 w-24 text-lg lg:text-xl hover:bg-red-500 lg:py-2 lg:w-36">
            Host
          </button>
        </Link>
        <Link to="/events">
          <button className="bg-none border border-black bg-white py-1 w-24 text-lg hover:bg-red-500 lg:text-xl lg:py-2 lg:w-36">
            Guest
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
