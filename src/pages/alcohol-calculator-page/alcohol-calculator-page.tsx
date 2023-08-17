import {
  Box,
  StyledEngineProvider,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./alcohol-calculator-page.css";
import { selectUser } from "../../store/slices/user-slice";
import { DrinksForCalculator } from "../../components/drinks-for-calculator/drinks-for-calculator";
import {
  selectAlcoholCalculator,
  setAlcoholCalculatorResult,
} from "../../store/slices/alcohol-calculator-slice";
import {
  calculateConcentration,
  calculateEliminationTime,
} from "./alcohol-calculator";
import { AppDispatch } from "../../ts/types-and-interfaces";

function AlcoholCalculatorPage() {
  const user = useSelector(selectUser);
  const {
    userData: { sex, weight },
  } = user;
  const alcoholCalculator = useSelector(selectAlcoholCalculator);
  const {
    result: { concentration, eliminationTime },
    drinks,
  } = alcoholCalculator;
  const dispatch = useDispatch<AppDispatch>();

  function handleClickCalculate() {
    const concentration = calculateConcentration(sex, weight, drinks);
    const eliminationTime = calculateEliminationTime(
      sex,
      Number(concentration),
    );

    dispatch(setAlcoholCalculatorResult({ concentration, eliminationTime }));
  }

  return (
    <StyledEngineProvider injectFirst>
      <Paper className="calculator-box">
        <Typography variant="h4">Alcohol Calculator</Typography>
        <Typography>
          The alcohol calculator calculates the concentration of alcohol in the
          blood and the estimated time of its elimination from the body. The
          calculation is made according to the Widmark formula.
        </Typography>
        <Box className="calculator-content">
          <Box>
            <DrinksForCalculator />
          </Box>
          <Box>
            <Button
              variant="outlined"
              onClick={handleClickCalculate}
              className="calculate-button"
            >
              Calculate
            </Button>
            <Typography className="calculator-result">
              Alcohol concentration: {concentration}‰
            </Typography>
            <Typography className="calculator-result">
              Elimination time: {eliminationTime}h
            </Typography>
          </Box>
        </Box>
      </Paper>
    </StyledEngineProvider>
  );
}

export { AlcoholCalculatorPage };
