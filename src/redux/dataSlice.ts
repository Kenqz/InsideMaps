import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CircleData {
  id: string;
  title: string;
  description: string;
  file: string;
}

const initialState: CircleData = {
  id: "",
  title: "",
  description: "",
  file: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData(state, action: PayloadAction<CircleData>) {
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        file: action.payload.file,
      };
    },
  },
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;
