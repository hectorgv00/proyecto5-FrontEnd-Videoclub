import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    content: {},
  },
  reducers: {
    viewLoan: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    contentType: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { viewLoan, contentType } = contentSlice.actions;

export const contentData = (state) => state.content;

export default contentSlice.reducer;
