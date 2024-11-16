import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  /*useEffect(()=>{
    return () => dispatch(setSelectedUser(null))
  },[])*/
  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[700px] flex flex-col h-full">
          <div className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 mb-2">
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2 ">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <Messages />
          </div>
          <div>
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white font-bold">
            Hi,{authUser?.fullName}{" "}
          </h1>
          <h1 className="text-2xl text-white">Let's start conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
