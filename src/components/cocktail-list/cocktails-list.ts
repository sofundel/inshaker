import { COCKTAILS_PER_PAGE } from "../../store/slices/cocktails/cocktails-search-slice";
import { ICocktailCardData } from "../../ts/types-and-interfaces";

function getCocktailListPerPage(
  cocktailList: ICocktailCardData[],
  currentPage: number,
) {
  const firstCocktailOnPage =
    currentPage * COCKTAILS_PER_PAGE - COCKTAILS_PER_PAGE;
  const lastCocktailOnPage = firstCocktailOnPage + COCKTAILS_PER_PAGE;
  return cocktailList.slice(firstCocktailOnPage, lastCocktailOnPage);
}

export { getCocktailListPerPage };
