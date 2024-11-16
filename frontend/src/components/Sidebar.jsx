import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setAuthuser, setOtherUsers } from "../redux/userSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthuser(null))
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found");
    }
  };
  return (
    <div className=" border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={searchSubmitHandler} className=" flex items-center gap-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" input input-bordered rounded-md text-white"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className=" btn bg-slate-600 text-white">
          <BsSearch size={"24px"} />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className=" mt-2">
        <button
          onClick={logoutHandler}
          className=" btn btn-sm bg-gray-400 text-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
