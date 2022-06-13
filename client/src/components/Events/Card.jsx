import React from "react";
import { BiMessageSquareDetail } from 'react-icons/bi'
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="relative w-11/12 m-auto shadow-md rounded overflow-hidden bg-white lg:w-80">
      <img src={data.image} alt="event" />
      <div className="p-2">
        <h1>{data.title}</h1>
        <p>{data.sub}</p>
        <p>{data.amount}</p>
      </div>
      <div className="absolute bottom-2 right-2 text-gray-400">
        <Link to={`/events-data/${data.id}`} className="text-xl hover:text-black lg:text-2xl">
          <BiMessageSquareDetail />
        </Link>
      </div>
    </div>
  );
};

export default Card;
