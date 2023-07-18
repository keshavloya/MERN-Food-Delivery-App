import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter(
        (FoodItem) =>
          FoodItem.id !== action.payload.id ||
          FoodItem.size !== action.payload.size
      );
    },
    update: (state, action) => {
      const foodItems = state.filter(
        (foodItem) =>
          foodItem.id !== action.payload.id ||
          foodItem.size !== action.payload.size
      );
      return [...foodItems, action.payload];
    },
    drop: (state) => {
      return [];
    },
  },
});

export const { add, remove, update, drop } = cartSlice.actions;
export default cartSlice.reducer;
