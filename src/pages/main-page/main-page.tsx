import { Box } from "@mui/material";
import { Header } from "../../components/header/header";
import { Outlet, useLocation } from "react-router-dom";
import "./main-page.css";
import { ErrorDialog } from "../../components/error-dialog/error-dialog";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../ts/types-and-interfaces";
import { resetCocktailDetails } from "../../store/slices/cocktails/cocktail-details-slice";
import { ProfileDialog } from "../../components/profile-dialog/profile-dialog";
import { getFromLocalStorage } from "../../ts/storage-operations";
import { STORAGE_KEY } from "../../ts/global-constants";
import { setUserData } from "../../store/slices/user-slice";
import { resetAlcoholCalculator } from "../../store/slices/alcohol-calculator-slice";

function MainPage() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const data = getFromLocalStorage(STORAGE_KEY);

    if (Object.keys(data).length !== 0) {
      dispatch(setUserData(data));
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/cocktails/:cocktail_id") {
      dispatch(resetCocktailDetails());
    }
    if (location.pathname !== "/alcohol-calculator") {
      dispatch(resetAlcoholCalculator());
    }
  }, [location]);

  return (
    <>
      <Header />
      <Box className="content-box">
        <Outlet />
      </Box>
      <ErrorDialog />
      <ProfileDialog />
    </>
  );
}

export { MainPage };
