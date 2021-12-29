import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface snackBarMUI {
  message: string;
}

export const SnackBarMUI: React.FC<snackBarMUI> = (props) => {
  const [openStatus, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openStatus}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.message}
        action={action}
      />
    </div>
  );
};
