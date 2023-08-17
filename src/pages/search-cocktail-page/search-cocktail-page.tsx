import { Paper, Box, Typography, StyledEngineProvider } from "@mui/material";
import "./search-cocktail-page.css";
import { SearchPanel } from "../../components/search-panel/search-panel";
import { CocktailList } from "../../components/cocktail-list/cocktail-list";
import { PaginationPanel } from "../../components/pagination-panel/pagination-panel";

function SearchCocktailPage() {
  return (
    <StyledEngineProvider injectFirst>
      <Box className="search-cocktail-box">
        <Paper className="search-panel-box">
          <Typography variant="h4">Search</Typography>
          <SearchPanel />
        </Paper>
        <PaginationPanel />
        <CocktailList />
      </Box>
    </StyledEngineProvider>
  );
}

export { SearchCocktailPage };
