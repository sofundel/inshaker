import { configureStore } from "@reduxjs/toolkit";
import { errorReducer } from "./slices/error-slice";
import { cocktailsReducer } from "./slices/cocktails/cocktails-reducer";
import { userReducer } from "./slices/user-slice";
import { alcoholCalculatorReducer } from "./slices/alcohol-calculator-slice";

const store = configureStore({
  reducer: {
    cocktails: cocktailsReducer,
    error: errorReducer,
    user: userReducer,
    alcoholCalculator: alcoholCalculatorReducer,
  },
});

export { store };
