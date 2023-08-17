import { createSlice } from "@reduxjs/toolkit";
import { IErrorData, RootState } from "../../ts/types-and-interfaces";

const ERROR_INITIAL_STATE: IErrorData = {
  isErrorDialogVisible: false,
  errorData: { status: 0, message: "" },
};

const errorSlice = createSlice({
  name: "error",
  initialState: ERROR_INITIAL_STATE,
  reducers: {
    setErrorData(error, action) {
      error.errorData.status = action.payload.status;
      error.errorData.message = action.payload.message;
    },
    resetErrorData(error) {
      error.errorData.status = ERROR_INITIAL_STATE.errorData.status;
      error.errorData.message = ERROR_INITIAL_STATE.errorData.message;
    },
    setErrorDialogVisibility(error, action) {
      error.isErrorDialogVisible = action.payload;
    },
  },
});

const { setErrorData, resetErrorData, setErrorDialogVisibility } =
  errorSlice.actions;
const errorReducer = errorSlice.reducer;
const selectError = (state: RootState) => state.error;

export {
  errorReducer,
  selectError,
  setErrorData,
  resetErrorData,
  setErrorDialogVisibility,
};
