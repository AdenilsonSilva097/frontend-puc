import React from "react";

import { Alert, Snackbar as SnackbarMui } from "../../libraries/mui/components";

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  open, onClose, message, severity
}) => (
  <SnackbarMui open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </SnackbarMui>
);

export default Snackbar;
