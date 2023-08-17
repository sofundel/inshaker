import {
  StyledEngineProvider,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Box,
} from "@mui/material";
import "./drinks-for-calculator.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAlcoholCalculator,
  setAlcoholPercent,
  setVolume,
} from "../../store/slices/alcohol-calculator-slice";
import { AppDispatch } from "../../ts/types-and-interfaces";
import { allowOnlyNumbers } from "../../ts/utils/input-checks";

function DrinksForCalculator() {
  const alcoholCalculator = useSelector(selectAlcoholCalculator);
  const { drinks } = alcoholCalculator;
  const dispatch = useDispatch<AppDispatch>();

  function handleChangePercent(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    let alcoholPercent: string | number = event.target.value;
    alcoholPercent = allowOnlyNumbers(alcoholPercent);
    alcoholPercent = Number(alcoholPercent) > 100 ? 100 : alcoholPercent;

    dispatch(setAlcoholPercent({ index, alcoholPercent }));
  }

  function handleChangeVolume(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    let volume: string | number = event.target.value;
    volume = allowOnlyNumbers(volume);

    dispatch(setVolume({ index, volume }));
  }

  return drinks.map((item, index) => (
    <StyledEngineProvider injectFirst key={item.id}>
      <Box className="drink-item-calculator">
        <Typography variant="h5">{item.name}</Typography>
        <FormControl sx={{ width: "10rem" }} variant="outlined">
          <OutlinedInput
            value={item.alcoholPercent}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangePercent(event, index)
            }
            size="small"
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </FormControl>
        <FormControl sx={{ width: "10rem" }} variant="outlined">
          <OutlinedInput
            value={item.volume}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeVolume(event, index)
            }
            size="small"
            endAdornment={<InputAdornment position="end">ml</InputAdornment>}
          />
        </FormControl>
      </Box>
    </StyledEngineProvider>
  ));
}

export { DrinksForCalculator };
