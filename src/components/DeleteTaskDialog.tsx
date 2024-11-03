import React from "react";
import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { DeleteTaskDialogProps } from "../interfaces/interfaces";

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-task-dialog"
      PaperProps={{ sx: { py: 3 } }}
    >
      <DialogTitle id="delete-task-dialog" variant="body1" sx={{ fontWeight: 500, pb: 3 }}>
        La tarea que seleccionaste será eliminada.
      </DialogTitle>
      <DialogActions sx={{ px: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#252525",
            borderColor: "#252525",
            "&:hover": {
              backgroundColor: "#252525",
              color: "#ffffff",
            },
          }}
        >
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
