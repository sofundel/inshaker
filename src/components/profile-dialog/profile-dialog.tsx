import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  StyledEngineProvider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./profile-dialog.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setProfileDialogVisibility,
  setUserData,
} from "../../store/slices/user-slice";
import { AppDispatch } from "../../ts/types-and-interfaces";
import { ProfileUserData } from "../profile-user-data/profile-user-data";
import { useEffect, useState } from "react";
import { setToLocalStorage } from "../../ts/storage-operations";
import { STORAGE_KEY } from "../../ts/global-constants";

const MESSAGE_DEFAULT = "";

function ProfileDialog() {
  const user = useSelector(selectUser);
  const {
    isProfileDialogVisible,
    userData: { sex, weight },
  } = user;
  const dispatch = useDispatch<AppDispatch>();

  const dataDefault = {
    sex,
    weight,
  };
  const [data, setData] = useState(dataDefault);
  const [message, setMessage] = useState(MESSAGE_DEFAULT);

  useEffect(() => {
    setData({ sex, weight });
  }, [user.userData]);

  function handleClickClose() {
    dispatch(setProfileDialogVisibility(false));
    setMessage(MESSAGE_DEFAULT);
    setTimeout(() => setData(dataDefault), 300);
  }

  function handleClickSave() {
    setMessage(MESSAGE_DEFAULT);
    if (Number(data.weight) === 0) {
      setMessage("Wrong weight!");
      return;
    }
    dispatch(setUserData(data));
    setToLocalStorage(STORAGE_KEY, data);
    dispatch(setProfileDialogVisibility(false));
  }

  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        open={isProfileDialogVisible}
        onClose={handleClickClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Profile</DialogTitle>
        <IconButton onClick={handleClickClose} className="close-profile-button">
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <ProfileUserData data={data} setData={setData} />
          <Typography className="profile-message">{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickSave} className="save-button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </StyledEngineProvider>
  );
}

export { ProfileDialog };
