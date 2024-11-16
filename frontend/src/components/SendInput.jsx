import React, { useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
import { useDispatch, useSelector } from "react-redux";


const SendInput = () => {
  const {selectedUser} = useSelector(store=>store.user)
  const {messages} = useSelector(store=>store.message)
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,{message}, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      dispatch(setMessages([...messages,res?.data?.newMessage]))
    } catch (error) {
      console.log(error);
      
    }
    setMessage("")

  }
  return (
    <form onSubmit={onSubmitHandler} className="my-3 px-4">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className=" border text-sm rounded-lg p-3 border-zinc-700 block w-full bg-gray-800 text-white"
         />
         <button type="submit" className=" inset-y-0 end-0 pr-4 absolute flex  items-center">
            <IoSendOutline className=""/>
         </button>
      </div>
    </form>
  );
};

export default SendInput;
