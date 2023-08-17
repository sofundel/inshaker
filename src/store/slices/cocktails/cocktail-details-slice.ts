import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICocktailDetails, RootState } from "../../../ts/types-and-interfaces";
import axios from "axios";
import { REQUEST_STATUSES, URL_PATHS } from "../../../ts/global-constants";
import { setErrorData, setErrorDialogVisibility } from "../error-slice";

const COCKTAIL_DETAILS_INITIAL_STATE: ICocktailDetails = {
  isCocktailDetailsLoading: true,
  cocktailDetailsData: {
    id: 0,
    name: "",
    imgUrl: "",
    alcoholic: "",
    glass: "",
    composition: [],
    recipe: "",
  },
};

const getCocktailDetails = createAsyncThunk(
  "cocktailDetails/getCocktailDetails",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`${URL_PATHS.COCKTAIL_DETAILS}${id}`);

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

      const cocktailDetails = response.data.drinks[0];
      return cocktailDetails;
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

const cocktailDetailsSlice = createSlice({
  name: "cocktailDetails",
  initialState: COCKTAIL_DETAILS_INITIAL_STATE,
  reducers: {
    resetCocktailDetails() {
      return COCKTAIL_DETAILS_INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCocktailDetails.pending, (cocktailDetails) => {
      cocktailDetails.isCocktailDetailsLoading = true;
    });
    builder.addCase(getCocktailDetails.fulfilled, (cocktailDetails, action) => {
      const {
        idDrink,
        strDrink,
        strDrinkThumb,
        strAlcoholic,
        strGlass,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
      } = action.payload;

      cocktailDetails.cocktailDetailsData.id = idDrink;
      cocktailDetails.cocktailDetailsData.name = strDrink;
      cocktailDetails.cocktailDetailsData.imgUrl = strDrinkThumb;
      cocktailDetails.cocktailDetailsData.alcoholic = strAlcoholic;
      cocktailDetails.cocktailDetailsData.glass = strGlass;
      cocktailDetails.cocktailDetailsData.recipe = strInstructions;

      const ingredientList = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
      ];

      const measureList = [
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
      ];

      let composition: { ingredient: string; count: string }[] = [];
      ingredientList.forEach((item, index) => {
        if (item)
          composition.push({ ingredient: item, count: measureList[index] });
      });

      cocktailDetails.cocktailDetailsData.composition = composition;
      cocktailDetails.isCocktailDetailsLoading = false;
    });
  },
});

const { resetCocktailDetails } = cocktailDetailsSlice.actions;
const cocktailDetailsReducer = cocktailDetailsSlice.reducer;
const selectCocktailDetails = (state: RootState) =>
  state.cocktails.cocktailDetails;

export {
  cocktailDetailsReducer,
  selectCocktailDetails,
  getCocktailDetails,
  resetCocktailDetails,
};
