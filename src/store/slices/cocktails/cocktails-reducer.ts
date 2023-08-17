import { combineReducers } from "redux";
import { randomCocktailReducer } from "./random-cocktail-slice";
import { cocktailDetailsReducer } from "./cocktail-details-slice";
import { cocktailsSearchReducer } from "./cocktails-search-slice";

const cocktailsReducer = combineReducers({
  randomCocktail: randomCocktailReducer,
  cocktailDetails: cocktailDetailsReducer,
  cocktailsSearch: cocktailsSearchReducer,
});

export { cocktailsReducer };
