import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "",
  email: "",
};

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload.email;
      console.log("email updated from state:", state.email);
    },
    updateImage: (state, action) => {
      state.imageUrl = action.payload.imageUrl;
      console.log("Image updated from state:", state.imageUrl);
    },
  },
});

const store = configureStore({
  reducer: {
    nft: nftSlice.reducer,
  },
});

export default store;
export const { updateEmail, updateImage } = nftSlice.actions;
