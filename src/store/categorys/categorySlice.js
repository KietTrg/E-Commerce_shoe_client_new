import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const categorySlice = createSlice({
  name: "category",
  initialState: {
    newCategory: null,

    errorMessage: "",
  },
  reducers: {
    // logout: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getNewCategorys.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getNewCategorys.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newCategory = action.payload;
    });
    builder.addCase(actions.getNewCategorys.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
// export const {} = productSlice.actions;

export default categorySlice.reducer;
