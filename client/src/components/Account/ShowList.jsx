import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const ShowList = ({ setShowList, event, user }) => {
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    const eventInfo = {
      event: event.id,
    };
    axios
      .post("/api/people/getlist", eventInfo)
      .then((res) => {
        setPeopleList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [event]);

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-400/70">
      <div
        className="absolute top-4 right-4 lg:top-28 lg:right-96 text-white text-5xl cursor-pointer"
        onClick={() => setShowList(false)}
      >
        <IoIosCloseCircle />
      </div>
      <div className="w-11/12 p-3 bg-white rounded-md md:w-2/3 lg:w-1/3">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border bg-pink-400">no.</th>
              <th className="border bg-green-300" colSpan={1}>
                name
              </th>
              <th className="border bg-blue-500" colSpan={1}>
                email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-300">
              <td className="border">*</td>
              <td className="border">host</td>
              <td className="border">{user.email}</td>
            </tr>
            {peopleList &&
              peopleList.map((list, index) => (
                <tr key={index + 1}>
                  <td className="border">{index + 1}</td>
                  <td className="border">{list.username}</td>
                  <td className="border">{list.useremail}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowList;
