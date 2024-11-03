import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import { SlideProps } from "@mui/material/Slide";
import { AddTaskDialogProps } from "../interfaces/interfaces";

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  open,
  onClose,
  handleCloseSnackbar,
  onSubmit,
  categories,
  formState,
  handleFormChange,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit,
          sx: { minWidth: { xs: "calc(100% - 32px)", sm: "444px" } },
        }}
        aria-labelledby="new-task-dialog"
      >
        <DialogTitle id="new-task-dialog" variant="h6">
          Nueva tarea
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Stack spacing={2} sx={{p: 1.25}}>
            <TextField
              label="Título"
              name="title"
              id="title-input"
              value={formState.formData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              variant="standard"
              fullWidth
              inputProps={{ maxLength: 40 }}
              title="Este campo es obligatorio. El máximo de caracteres permitidos en este campo es 40."
              error={formState.errors.title}
              helperText={formState.errors.title && "Debes completar el campo Título."}
            />
            <TextField
              label="Descripción"
              name="description"
              id="description-input"
              value={formState.formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              variant="standard"
              fullWidth
              inputProps={{ maxLength: 100 }}
              title="El máximo de caracteres permitidos en este campo es 100."
            />
            <FormControl fullWidth error={formState.errors.category_id}>
              <InputLabel sx={{ left: "-14px" }} id="select-category-label">
                Categoría
              </InputLabel>
              <Select
                labelId="select-category-label"
                name="category_id"
                value={formState.formData.category_id}
                onChange={(e) => handleFormChange("category_id", e.target.value)}
                variant="standard"
                title="Este campo es obligatorio."
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {formState.errors.category_id && (
                <FormHelperText>Debes seleccionar una categoría</FormHelperText>
              )}
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="button" variant="outlined" color="primary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={formState.snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: formState.snackbar.horizontal }}
        TransitionComponent={(props: SlideProps) => (
          <Slide {...props} direction={formState.snackbar.transition} />
        )}
        sx={{ display: formState.snackbar.open ? "flex" : "none" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={formState.snackbar.severity}
          variant={formState.snackbar.variant}
          sx={{ width: "100%" }}
        >
          {formState.snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddTaskDialog;
