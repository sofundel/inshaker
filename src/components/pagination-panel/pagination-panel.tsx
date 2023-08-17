import { Pagination, StyledEngineProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../ts/types-and-interfaces";
import "./pagination-panel.css";
import {
  selectCocktailsSearch,
  setCurrentPage,
} from "../../store/slices/cocktails/cocktails-search-slice";

function PaginationPanel() {
  const cocktailsSearch = useSelector(selectCocktailsSearch);
  const {
    pagination: { totalPages, currentPage },
  } = cocktailsSearch;
  const dispatch = useDispatch<AppDispatch>();

  function handleChangePage(_event: React.ChangeEvent<unknown>, page: number) {
    dispatch(setCurrentPage(page));
  }

  return (
    <StyledEngineProvider injectFirst>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        variant="outlined"
        className="pagination-panel"
      />
    </StyledEngineProvider>
  );
}

export { PaginationPanel };
