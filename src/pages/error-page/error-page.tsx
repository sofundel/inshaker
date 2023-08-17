import { Box, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./error-page.css";

function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  console.log(error);
  return (
    <Box className="error-page-box">
      <Typography variant="h4" sx={{ color: "white" }}>
        Oops!
      </Typography>
      <Typography
        variant="body1"
        sx={{ pt: "1rem", fontSize: "1.2rem", color: "white" }}
      >
        {errorMessage}
      </Typography>
    </Box>
  );
}

export { ErrorPage };
