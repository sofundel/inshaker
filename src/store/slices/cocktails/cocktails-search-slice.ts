import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ICocktailsSearchData,
  RootState,
} from "../../../ts/types-and-interfaces";
import axios from "axios";
import { REQUEST_STATUSES, URL_PATHS } from "../../../ts/global-constants";
import { setErrorData, setErrorDialogVisibility } from "../error-slice";

const SEARCH_TYPES = {
  BY_NAME: "byName",
  BY_INGREDIENT: "byIngredient",
};

const COCKTAILS_PER_PAGE = 2;

const COCKTAILS_SEARCH_INITIAL_STATE: ICocktailsSearchData = {
  searchType: SEARCH_TYPES.BY_NAME,
  searchText: "Gin",
  isCocktailListLoading: true,
  cocktailList: [],
  pagination: { currentPage: 1, totalPages: 1 },
};

const getCocktailList = createAsyncThunk(
  "cocktailsSearch/getCocktailList",
  async (data: { searchType: string; searchText: string }, thunkAPI) => {
    const { searchType, searchText } = data;
    try {
      const response =
        searchType === SEARCH_TYPES.BY_NAME
          ? await axios.get(`${URL_PATHS.SEARCH_BY_NAME}${searchText.trim()}`)
          : await axios.get(
              `${URL_PATHS.SEARCH_BY_INGREDIENT}${searchText.trim()}`,
            );

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
      const cocktailsList = response.data.drinks;
      return cocktailsList;
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

const cocktailsSearchSlice = createSlice({
  name: "cocktailsSearch",
  initialState: COCKTAILS_SEARCH_INITIAL_STATE,
  reducers: {
    changeSearchType(cocktailsSearch, action) {
      cocktailsSearch.searchType = action.payload;
      cocktailsSearch.searchText = COCKTAILS_SEARCH_INITIAL_STATE.searchText;
    },
    enterTextToSearch(cocktailsSearch, action) {
      cocktailsSearch.searchText = action.payload;
    },
    setCurrentPage(cocktailsSearch, action) {
      cocktailsSearch.pagination.currentPage = action.payload;
    },
    resetPagination(cocktailsSearch) {
      cocktailsSearch.pagination.currentPage =
        COCKTAILS_SEARCH_INITIAL_STATE.pagination.currentPage;
      cocktailsSearch.pagination.totalPages =
        COCKTAILS_SEARCH_INITIAL_STATE.pagination.totalPages;
    },
    setTotalPages(cocktailsSearch, action) {
      cocktailsSearch.pagination.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCocktailList.pending, (cocktailsSearch) => {
      cocktailsSearch.isCocktailListLoading = true;
    });
    builder.addCase(getCocktailList.fulfilled, (cocktailsSearch, action) => {
      let totalPages;
      totalPages = action.payload
        ? (cocktailsSearch.pagination.totalPages = Math.ceil(
            action.payload.length / COCKTAILS_PER_PAGE,
          ))
        : COCKTAILS_SEARCH_INITIAL_STATE.pagination.totalPages;
      cocktailsSearch.pagination.totalPages = totalPages;

      let cocktailList;
      cocktailList = action.payload
        ? action.payload.map((item: any) => ({
            id: item.idDrink,
            name: item.strDrink,
            imgUrl: item.strDrinkThumb,
          }))
        : COCKTAILS_SEARCH_INITIAL_STATE.cocktailList;

      cocktailsSearch.cocktailList = cocktailList;
      cocktailsSearch.isCocktailListLoading = false;
    });
  },
});

const {
  changeSearchType,
  enterTextToSearch,
  setCurrentPage,
  resetPagination,
  setTotalPages,
} = cocktailsSearchSlice.actions;
const cocktailsSearchReducer = cocktailsSearchSlice.reducer;
const selectCocktailsSearch = (state: RootState) =>
  state.cocktails.cocktailsSearch;

export {
  SEARCH_TYPES,
  COCKTAILS_PER_PAGE,
  cocktailsSearchReducer,
  selectCocktailsSearch,
  getCocktailList,
  changeSearchType,
  enterTextToSearch,
  setCurrentPage,
  resetPagination,
  setTotalPages,
};
