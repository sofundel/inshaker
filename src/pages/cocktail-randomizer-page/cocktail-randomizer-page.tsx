import {
  Box,
  Button,
  Typography,
  StyledEngineProvider,
  LinearProgress,
} from "@mui/material";
import { CocktailCard } from "../../components/cocktail-card/cocktail-card";
import { useEffect } from "react";
import "./cocktail-randomizer-page.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getRandomCocktail,
  selectRandomCocktail,
} from "../../store/slices/cocktails/random-cocktail-slice";
import { AppDispatch } from "../../ts/types-and-interfaces";

function CocktailRandomizerPage() {
  const dispatch = useDispatch<AppDispatch>();
  const randomCocktail = useSelector(selectRandomCocktail);
  const { cocktailData } = randomCocktail;

  useEffect(() => {
    dispatch(getRandomCocktail());
  }, [dispatch]);

  function handleClickRandomCocktail() {
    dispatch(getRandomCocktail());
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="randomizer-box">
        <Typography className="randomizer-title">
          Lift your spirits with a cocktail!
        </Typography>
        <CocktailCard {...cocktailData} />
        {randomCocktail.isCocktailDataLoading ? (
          <Button variant="outlined" className="randomizer-button">
            <LinearProgress color="inherit" />
          </Button>
        ) : (
          <Button
            onClick={handleClickRandomCocktail}
            variant="outlined"
            className="randomizer-button"
          >
            Generate random cocktail
          </Button>
        )}
      </Box>
    </StyledEngineProvider>
  );
}

export { CocktailRandomizerPage };
