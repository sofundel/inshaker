import {
  Paper,
  Typography,
  Button,
  Box,
  StyledEngineProvider,
} from "@mui/material";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../ts/types-and-interfaces";
import { setProfileDialogVisibility } from "../../store/slices/user-slice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  function handleClickOpenProfile() {
    dispatch(setProfileDialogVisibility(true));
  }

  function handleClickChangePage(path: string) {
    navigate(path);
  }

  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={0} className="header">
        <Link to="/">
          <Box className="header-box">
            <Typography variant="h5" className="header-title">
              Inshaker
            </Typography>
            <Typography
              variant="h5"
              className="header-title"
              sx={{ color: "deepPink !important" }}
            >
              &nbsp;2.0
            </Typography>
          </Box>
        </Link>
        <Box className="header-center-box">
          <Button
            onClick={() => handleClickChangePage("/search")}
            className="header-button"
          >
            Search Cocktail
          </Button>
          <Button
            onClick={() => handleClickChangePage("/alcohol-calculator")}
            className="header-button"
          >
            Alcohol Calculator
          </Button>
        </Box>
        <Box className="header-box" sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={handleClickOpenProfile}
            variant="outlined"
            className="header-button header-button-outlined"
          >
            My profile
          </Button>
        </Box>
      </Paper>
    </StyledEngineProvider>
  );
}

export { Header };
