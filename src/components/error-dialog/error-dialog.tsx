import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  StyledEngineProvider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  resetErrorData,
  selectError,
  setErrorDialogVisibility,
} from "../../store/slices/error-slice";
import "./error-dialog.css"

function ErrorDialog() {
  const error = useSelector(selectError);
  const {
    isErrorDialogVisible,
    errorData: { status, message },
  } = error;
  const dispatch = useDispatch();

  function handleClickClose() {
    dispatch(setErrorDialogVisibility(false));
    setTimeout(() => dispatch(resetErrorData()), 300);
  }

  return (
    <StyledEngineProvider injectFirst>
    <Dialog
      open={isErrorDialogVisible}
      onClose={handleClickClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Error {status}</DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          component="div"
          sx={{ overflowY: "hidden", background: "white" }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose} className="close-dialog-button" >ОК</Button>
      </DialogActions>
    </Dialog>
    </StyledEngineProvider>
  );
}

export { ErrorDialog };
