import { createSlice } from "@reduxjs/toolkit";
import { IUserData, RootState } from "../../ts/types-and-interfaces";

const SEX = {
  MALE: "male",
  FEMALE: "female",
};

const USER_INITIAL_STATE: IUserData = {
  isProfileDialogVisible: false,
  userData: { sex: SEX.MALE, weight: 70 },
};

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setUserData(user, action) {
      user.userData.sex = action.payload.sex;
      user.userData.weight = action.payload.weight;
    },
    setProfileDialogVisibility(user, action) {
      user.isProfileDialogVisible = action.payload;
    },
  },
});

const { setProfileDialogVisibility, setUserData } = userSlice.actions;
const userReducer = userSlice.reducer;
const selectUser = (state: RootState) => state.user;

export {
  SEX,
  userReducer,
  selectUser,
  setProfileDialogVisibility,
  setUserData,
};
