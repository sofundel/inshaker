import { store } from "../store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ICocktailCardData {
  id: number;
  name: string;
  imgUrl: string;
}

export interface IRandomCocktailData {
  isCocktailDataLoading: boolean;
  cocktailData: ICocktailCardData;
}

export interface ICocktailDetails {
  isCocktailDetailsLoading: boolean;
  cocktailDetailsData: {
    id: number;
    name: string;
    imgUrl: string;
    alcoholic: string;
    glass: string;
    composition: { ingredient: string; count: string }[];
    recipe: string;
  };
}

export interface IErrorData {
  isErrorDialogVisible: boolean;
  errorData: {
    status: number | string;
    message: string;
  };
}

export interface IUserData {
  isProfileDialogVisible: boolean;
  userData: {
    sex: string;
    weight: number | string;
  };
}

export interface IAlcoholCalculatorData {
  result: { concentration: number | string; eliminationTime: number | string };
  drinks: {
    id: number;
    name: string;
    alcoholPercent: number | string;
    volume: number | string;
  }[];
}

export interface IPaginationData {
  currentPage: number;
  totalPages: number;
}

export interface ICocktailsSearchData {
  searchType: string;
  searchText: string;
  isCocktailListLoading: boolean;
  cocktailList: ICocktailCardData[];
  pagination: IPaginationData;
}
