import React, { useState } from "react";
import { Snackbar, Button } from "@mui/material";

function SnackbarComp({ responseText, snackBarRef }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        hidden
        className="opacity-0"
        ref={snackBarRef}
        variant="contained"
        onClick={handleClick}
      ></Button>
      <Snackbar
        hidden
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
        message={responseText}
      />
    </div>
  );
}

export default SnackbarComp;
