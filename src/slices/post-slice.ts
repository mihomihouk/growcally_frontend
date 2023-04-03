import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//createSlice = define your main logic

//PayloadAction = TS type that define the context

// this is representing a shape that is going to be managed inside our reducer
interface CounterState {
  value: number;
}
// define initial value
const initialState: CounterState = {
  value: 0,
};

// counterSlice creates action for each of the different function
// inside the reducers field
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //it's okay to do this because tool kit uses immer that wrappers and tracks all the mutations
    // we try to do. So we don't need to write codes to copy
    incremented(state) {
      state.value++;
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;
