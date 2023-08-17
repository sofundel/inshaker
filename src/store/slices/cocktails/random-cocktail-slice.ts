import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IRandomCocktailData,
  RootState,
} from "../../../ts/types-and-interfaces";
import axios from "axios";
import { REQUEST_STATUSES, URL_PATHS } from "../../../ts/global-constants";
import { setErrorData, setErrorDialogVisibility } from "../error-slice";

const RANDOM_COCKTAIL_INITIAL_STATE: IRandomCocktailData = {
  isCocktailDataLoading: true,
  cocktailData: { id: 0, name: "", imgUrl: "" },
};

const getRandomCocktail = createAsyncThunk(
  "randomCocktail/getRandomCocktail",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(URL_PATHS.RANDOM_COCKTAIL);

      if (response.status !== REQUEST_STATUSES[200]) {
        thunkAPI.dispatch(
          setErrorData({
            status: response.status,
            message: response.statusText,
          }),
        );
        thunkAPI.dispatch(setErrorDialogVisibility(true));
        throw Error;
      }

      const randomCocktailData = response.data.drinks[0];
      return randomCocktailData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        thunkAPI.dispatch(
          setErrorData({
            status: error.response?.status,
            message: error.message,
          }),
        );
        thunkAPI.dispatch(setErrorDialogVisibility(true));
        throw Error;
      } else {
        throw Error;
      }
    }
  },
);

const randomCocktailSlice = createSlice({
  name: "randomCocktail",
  initialState: RANDOM_COCKTAIL_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRandomCocktail.pending, (randomCocktail) => {
      randomCocktail.isCocktailDataLoading = true;
    });
    builder.addCase(getRandomCocktail.fulfilled, (randomCocktail, action) => {
      const { idDrink, strDrink, strDrinkThumb } = action.payload;
      randomCocktail.cocktailData.id = idDrink;
      randomCocktail.cocktailData.name = strDrink;
      randomCocktail.cocktailData.imgUrl = strDrinkThumb;
      randomCocktail.isCocktailDataLoading = false;
    });
  },
});

const randomCocktailReducer = randomCocktailSlice.reducer;
const selectRandomCocktail = (state: RootState) =>
  state.cocktails.randomCocktail;

export { randomCocktailReducer, selectRandomCocktail, getRandomCocktail };
