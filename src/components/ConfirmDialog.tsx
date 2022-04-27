import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export interface ConfirmDialogProps {
  name: string;
  open: boolean;
  setOpen: any;
  onConfirm: () => void;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { name, open, setOpen, onConfirm } = props;
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="confirm-dialog">Delete</DialogTitle>
      <DialogContent>Do you want to delete {name}?</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="error"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
