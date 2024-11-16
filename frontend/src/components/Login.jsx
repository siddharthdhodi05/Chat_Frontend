import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthuser } from "../redux/userSlice";
import { BASE_URL } from "../main";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
        navigate("/")
        dispatch(setAuthuser(res.data))
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className=" min-w-96 mx-auto">
      <div className=" w-full p-6 rounded-lg bg-gray-400 h-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className=" text-3xl font-bold text-center text-black">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className=" label p-2">
              <span className=" text-base label-text text-black">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e)=>setUser({...user,username:e.target.value})}
              className=" w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className=" label p-2">
              <span className=" text-base label-text text-black">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
              className=" w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className=" mt-5 mb-4">
            <button className=" text-lg btn glass text-black btn-sm btn-block hover:text-white">
              Login
            </button>
          </div>
          <div className=" mt-2">
            <p className=" text-center">
              <Link className=" text-black" to={"/register"}>
                Don't have an account?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
