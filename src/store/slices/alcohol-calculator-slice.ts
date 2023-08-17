import { createSlice } from "@reduxjs/toolkit";
import {
  IAlcoholCalculatorData,
  RootState,
} from "../../ts/types-and-interfaces";

const ALCOHOL_CALCULATOR_DEFAULT: IAlcoholCalculatorData = {
  result: { concentration: "", eliminationTime: "" },
  drinks: [
    { id: 1, name: "Drink1", alcoholPercent: 40, volume: 100 },
    { id: 2, name: "Drink2", alcoholPercent: 0, volume: 0 },
    { id: 3, name: "Drink3", alcoholPercent: 0, volume: 0 },
  ],
};

const alcoholCalculatorSlice = createSlice({
  name: "alcoholCalculator",
  initialState: ALCOHOL_CALCULATOR_DEFAULT,
  reducers: {
    setAlcoholPercent(alcoholCalculator, action) {
      const { index, alcoholPercent } = action.payload;
      alcoholCalculator.drinks[index].alcoholPercent = alcoholPercent;
    },
    setVolume(alcoholCalculator, action) {
      const { index, volume } = action.payload;
      alcoholCalculator.drinks[index].volume = volume;
    },
    setAlcoholCalculatorResult(alcoholCalculator, action) {
      alcoholCalculator.result = action.payload;
    },
    resetAlcoholCalculator() {
      return ALCOHOL_CALCULATOR_DEFAULT;
    },
  },
});

const {
  setAlcoholPercent,
  setVolume,
  setAlcoholCalculatorResult,
  resetAlcoholCalculator,
} = alcoholCalculatorSlice.actions;
const alcoholCalculatorReducer = alcoholCalculatorSlice.reducer;
const selectAlcoholCalculator = (state: RootState) => state.alcoholCalculator;

export {
  alcoholCalculatorReducer,
  selectAlcoholCalculator,
  setAlcoholPercent,
  setVolume,
  setAlcoholCalculatorResult,
  resetAlcoholCalculator,
};
