import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (filters) => {
    const { make, duration } = filters;
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/inventory`, {
      params: { make, duration },
    });
    return response.data;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: { data: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInventory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default inventorySlice.reducer;
