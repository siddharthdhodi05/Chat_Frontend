import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const Signup = () => {
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message)
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
      
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className=" min-w-96 mx-auto">
      <div className=" w-full p-6 rounded-lg bg-gray-400 h-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className=" text-3xl font-bold text-center text-black">Sign-up</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className=" label p-2">
              <span className=" text-base label-text text-black">
                Full Name
              </span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className=" w-full input input-bordered h-10"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className=" label p-2">
              <span className=" text-base label-text text-black">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className=" w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className=" label p-2">
              <span className=" text-base label-text text-black">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className=" w-full input input-bordered h-10"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className=" flex items-center my-4 mx-2">
            <div className=" flex items-center">
              <p className=" text-black">Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox checkbox-primary border-black mx-2"
              />
            </div>

            <div className=" flex items-center">
              <p className=" text-black">Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox checkbox-primary border-black mx-2"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn glass text-black btn-sm btn-block hover:text-white"
            >
              Signup
            </button>
          </div>
          <div className=" mt-2">
            <p className=" text-center">
              <Link className=" text-black" to={"/login"}>
                Already have an account?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
