import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState:{
    authUser:null,
    otherUsers:null,
    selectedUser:null,
    onlineUsers:[],
  },
  reducers:{
    setAuthuser:(state,action)=>{
      state.authUser = action.payload;
    },
    setOtherUsers:(state,action)=>{
      state.otherUsers=action.payload;
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser=action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers=action.payload;
    }

  }
});

export const {setAuthuser,setOtherUsers, setSelectedUser, setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;