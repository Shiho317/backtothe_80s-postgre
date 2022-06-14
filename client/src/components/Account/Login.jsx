import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const Login = () => {
  const { myStorage } = useContext(AppContext);

  const [useremail, setUseremail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const loginUser = {
      email: useremail,
      password: userPassword,
    };

    await axios
      .post("http://localhost:8000/api/user/login", loginUser)
      .then((res) => {
        const user = res.data[0]
        const myAccount = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        myStorage.setItem("user", JSON.stringify(myAccount));
        navigate(`/account/${user.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-login-bg w-full h-screen bg-repeat bg-center flex items-center justify-center">
      <form className="flex flex-col gap-4 w-80 p-3" onSubmit={loginHandler}>
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
          Log in
        </button>
      </form>
      <div className="absolute top-50 right-10 flex flex-col items-center justify-center gap-6">
        <Link to="/signup">
          <button className="bg-none border border-black bg-white py-2 w-36 text-xl hover:bg-red-500">
            Sign Up
          </button>
        </Link>
        <Link to="/">
          <button className="bg-none border border-black bg-white py-2 w-36 text-xl hover:bg-red-500">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
