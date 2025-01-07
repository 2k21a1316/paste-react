import {configureStore} from "@reduxjs/toolkit"
import pasteReducer from "./pasteSlice"//link reducer to store
//copy paste the code of store from documentation while redux setup
export const store = configureStore({
  reducer:{
      paste: pasteReducer//link reducer to store
  }
})