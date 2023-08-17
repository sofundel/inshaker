import { Box, Typography, StyledEngineProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../ts/types-and-interfaces";
import {
  getCocktailList,
  selectCocktailsSearch,
} from "../../store/slices/cocktails/cocktails-search-slice";
import { CocktailCard } from "../cocktail-card/cocktail-card";
import "./cocktails-list.css";
import { getCocktailListPerPage } from "./cocktails-list";

const EMPTY_SEARCH = "";

function CocktailList() {
  const cocktailsSearch = useSelector(selectCocktailsSearch);
  const {
    isCocktailListLoading,
    searchText,
    searchType,
    cocktailList,
    pagination: { currentPage },
  } = cocktailsSearch;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCocktailList({ searchText, searchType }));
  }, [searchText, searchType]);

  const cocktailListPerPage = getCocktailListPerPage(cocktailList, currentPage);
  const cocktailCardList = cocktailListPerPage.map((item) => {
    return <CocktailCard key={item.id} {...item} />;
  });

  if (isCocktailListLoading)
    return (
      <Box
        className="waiting-list-img"
        component="img"
        src={"../src/styles/images/waiting-page.gif"}
      />
    );

  if (cocktailCardList.length === 0 && searchText !== EMPTY_SEARCH)
    return (
      <StyledEngineProvider injectFirst>
        <Typography className="list-no-results">No results</Typography>
      </StyledEngineProvider>
    );

  return (
    <StyledEngineProvider injectFirst>
      <Box className="cocktail-list-box">{cocktailCardList}</Box>
    </StyledEngineProvider>
  );
}

export { CocktailList };
