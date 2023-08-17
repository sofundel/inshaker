import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  StyledEngineProvider,
  TextField,
} from "@mui/material";
import "./search-panel.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../ts/types-and-interfaces";
import {
  SEARCH_TYPES,
  changeSearchType,
  enterTextToSearch,
  resetPagination,
  selectCocktailsSearch,
} from "../../store/slices/cocktails/cocktails-search-slice";

const FIRST_PAGE = 1;

function SearchPanel() {
  const cocktailsSearch = useSelector(selectCocktailsSearch);
  const {
    searchType,
    searchText,
    pagination: { currentPage },
  } = cocktailsSearch;
  const dispatch = useDispatch<AppDispatch>();

  function handleChangeType(event: React.ChangeEvent<HTMLInputElement>) {
    const type = event.target.value;
    type === SEARCH_TYPES.BY_NAME
      ? dispatch(changeSearchType(SEARCH_TYPES.BY_NAME))
      : dispatch(changeSearchType(SEARCH_TYPES.BY_INGREDIENT));
    if (currentPage !== FIRST_PAGE) {
      dispatch(resetPagination());
    }
  }

  function handleChangeSearchText(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(enterTextToSearch(event.target.value));
    if (currentPage !== FIRST_PAGE) {
      dispatch(resetPagination());
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="search-panel">
        <FormControl>
          <FormLabel sx={{ mt: "1rem" }}>Search by:</FormLabel>
          <RadioGroup row value={searchType} onChange={handleChangeType}>
            <FormControlLabel
              value={SEARCH_TYPES.BY_NAME}
              control={<Radio />}
              label="Cocktail Name"
            />
            <FormControlLabel
              value={SEARCH_TYPES.BY_INGREDIENT}
              control={<Radio />}
              label="Ingredient"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          onChange={handleChangeSearchText}
          value={searchText}
          label="Search"
          variant="outlined"
        />
      </Box>
    </StyledEngineProvider>
  );
}

export { SearchPanel };
