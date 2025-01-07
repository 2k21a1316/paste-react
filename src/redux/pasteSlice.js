import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"//use toast

const initialState = {
  //ternary condition used
  pastes: localStorage.getItem("pastes")//all list of paste
    ? JSON.parse(localStorage.getItem("pastes"))//initial data of paste app ,if data exist thenparse it into json
    : []//if no data then empty array 
}

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: //functions or features
  {
    addToPastes: (state, action) => {//action is addtopaste for payload data which comes with action 
      const paste = action.payload//payload data which comes with action ,and add this paste payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)//find index if already paste is exist mean 0 or + ,if - means not exist

      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist")
        return
      }

      // If the course is not in the Pastes, add it to the Pastes
      state.pastes.push(paste)// add the paste into pastes list which stores in store not localstorage
      
      // Update to localstorage
      // pastes is key and state.pastes is value 
      // parse paste into json 
      localStorage.setItem("pastes", JSON.stringify(state.pastes))//to store into local storage
      // show toast
      toast.success("Paste added")//.success se green tick show hota hai toast me
    },

    updatePastes: (state, action) => {
      const paste = action.payload//update this payload comes with update action
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste updated")
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload

      console.log(pasteId)
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.pastes.splice(index, 1)//Splice refers to a method used to add, remove, or replace elements in an array,remove 1 paste from the passed index
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste deleted")
      }
    },
    resetPaste: (state) => {
      state.pastes = []
      // Update to localstorage
      localStorage.removeItem("pastes")
    },
  },
})

export const { addToPastes, removeFromPastes, updatePastes } = pasteSlice.actions

export default pasteSlice.reducer