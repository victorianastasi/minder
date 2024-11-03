import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Fab,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "./utils/theme";
import { useTaskItem } from "./utils/useTaskItem";
import TaskList from "./components/TaskList";
import AddTaskDialog from "./components/AddTaskDialog";
import DeleteTaskDialog from "./components/DeleteTaskDialog";
import FilterByCategories from "./components/FilterByCategories";

function App() {
  const {
    tasks,
    categories,
    loading,
    handleCategoryChange,
    categoryFilter,
    handleToggleCheckbox,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    confirmDeleteTask,
    openFormDialog,
    handleCloseFormDialog,
    setOpenFormDialog,
    closeSnackbar,
    state,
    handleFormChange,
    handleSubmitForm,
  } = useTaskItem();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" component="main" sx={{ position: "relative", mt: 8, mb: 5 }}>
          <Box sx={{ p: 1.25 }}>
            <Typography component="h1" variant="h3">
              Lista de tareas
            </Typography>
            <FilterByCategories
              categories={categories}
              handleCategoryChange={handleCategoryChange}
              categoryFilter={categoryFilter}
            />
            {loading ? (
              <Stack sx={{ height: "50vh", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={60} />
              </Stack>
            ) : (
              <>
                <TaskList
                  tasks={tasks.filter((task) => !task.completed)}
                  categories={categories}
                  onToggle={handleToggleCheckbox}
                  onDelete={handleOpenModalDelete}
                  tasksCompleted={false}
                />
                <TaskList
                  tasks={tasks.filter((task) => task.completed)}
                  categories={categories}
                  onToggle={handleToggleCheckbox}
                  onDelete={handleOpenModalDelete}
                  tasksCompleted={true}
                />
                <DeleteTaskDialog
                  open={openModalDelete}
                  onClose={handleCloseModalDelete}
                  onConfirm={confirmDeleteTask}
                />
              </>
            )}
            <Fab
              type="button"
              aria-label="Agregar nueva tarea"
              color="primary"
              onClick={() => setOpenFormDialog(true)}
              sx={{ position: "sticky", bottom: "2.5rem", left: "100%" }}
            >
              <AddIcon />
            </Fab>
            <AddTaskDialog
              open={openFormDialog}
              onClose={handleCloseFormDialog}
              handleCloseSnackbar={closeSnackbar}
              onSubmit={handleSubmitForm}
              categories={categories}
              formState={state}
              handleFormChange={handleFormChange}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
