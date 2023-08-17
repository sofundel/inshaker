import {
  StyledEngineProvider,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import "./profile-user-data.css";
import { allowOnlyNumbers } from "../../ts/utils/input-checks";

function ProfileUserData(props: {
  data: { sex: string; weight: number | string };
  setData: React.Dispatch<
    React.SetStateAction<{
      sex: string;
      weight: number | string;
    }>
  >;
}) {
  const { data, setData } = props;
  const { sex, weight } = data;

  function handleChangeWeight(event: React.ChangeEvent<HTMLInputElement>) {
    let inputWeight = event.target.value;
    inputWeight = allowOnlyNumbers(inputWeight);

    setData({ ...data, weight: inputWeight });
  }

  function handleChangeSex(event: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, sex: event.target.value });
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box className="user-data-box">
        <FormControl sx={{ width: "10rem" }} variant="outlined">
          <OutlinedInput
            value={weight}
            onChange={handleChangeWeight}
            size="small"
            id="weight"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
          <FormHelperText>Weight</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup value={sex} onChange={handleChangeSex}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </StyledEngineProvider>
  );
}

export { ProfileUserData };
