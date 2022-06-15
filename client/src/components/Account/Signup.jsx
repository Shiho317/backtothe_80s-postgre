import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    const registerUser = {
      name: username,
      email: useremail,
      password: userPassword,
    };

    await axios
      .post("/api/user/register", registerUser)
      .then((res) => {
        alert("You are successfully registered.");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-signup-bg w-full h-screen bg-repeat bg-center flex items-center justify-center">
      <form className="flex flex-col gap-3 w-80 p-3" onSubmit={registerHandler}>
        <label id="name" className="text-white">
          NAME:
        </label>
        <input
          type="text"
          name="name"
          placeholder="YOUR NAME"
          className="h-10 outline-none px-1"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label id="email" className="text-white">
          EMAIL:
        </label>
        <input
          type="text"
          name="email"
          placeholder="YOUR EMAIL"
          className="h-10 outline-none px-1"
          onChange={(e) => setUseremail(e.target.value)}
        />
        <label id="password" className="text-white">
          PASSWORD:
        </label>
        <input
          type="password"
          name="password"
          placeholder="YOUR PASSWORD"
          className="h-10 outline-none px-1"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-black w-1/2 mt-4 m-auto h-10 bg-none border border-black hover:bg-red-500"
        >
          Sign Up
        </button>
      </form>
      <div className="absolute top-3/4 right-2 gap-2 flex flex-col items-center justify-center lg:gap-6 lg:top-50 lg:right-10">
        <Link to="/login">
          <button className="bg-none border border-black bg-white py-1 w-24 text-lg lg:text-xl hover:bg-red-500 lg:py-2 lg:w-36">
            Log In
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

export default Signup;
