import axios from "axios";
import { CategoriesType, FormAction, FormState, TaskType } from "../interfaces/interfaces";
import { useCallback, useEffect, useReducer, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export const useTaskItem = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const initialFormData: TaskType = {
    title: "",
    description: "",
    category_id: "",
    completed: false,
    id: "",
  };
  const initialState: FormState = {
    formData: initialFormData,
    errors: { title: false, category_id: false },
    snackbar: {
      open: false,
      message: "",
      severity: "warning",
      variant: "standard",
      horizontal: "center",
      transition: "up",
    },
  };
  function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
      case "SET_FORM_DATA":
        return { ...state, formData: { ...state.formData, [action.field]: action.payload } };
      case "SET_ERROR":
        return { ...state, errors: { ...state.errors, [action.field]: action.payload } };
      case "SHOW_SNACKBAR":
        return {
          ...state,
          snackbar: {
            open: true,
            message: action.message,
            severity: action.severity,
            variant: action.variant,
            horizontal: action.horizontal,
            transition: action.transition,
          },
        };
      case "CLOSE_SNACKBAR":
        return { ...state, snackbar: { ...state.snackbar, open: false } };
      case "RESET_FORM":
        return { ...state, formData: action.payload.formData, errors: action.payload.errors };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const tasksResponse = await axios.get("http://localhost:3000/tasks");
        setTasks(tasksResponse.data);

        const categoriesResponse = await axios.get("http://localhost:3000/categories");
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategoryFilter(event.target.value);
  };

  const filterTasks = () => {
    return categoryFilter ? tasks.filter((task) => task.category_id === categoryFilter) : tasks;
  };

  const handleToggleCheckbox = useCallback(
    async (id: string): Promise<void> => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      );

      const currentTask = tasks.find((task) => task.id === id);
      if (!currentTask) return;

      try {
        await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...currentTask, completed: !currentTask.completed }),
        });
        console.log(`Tarea con id ${id} actualizada en la base de datos.`);
      } catch (error) {
        console.error("Error al actualizar la tarea en la base de datos:", error);
      }
    },
    [tasks]
  );

  // Delete task
  const handleOpenModalDelete = (taskId: string) => {
    setTaskIdToDelete(taskId);
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setTaskIdToDelete(null);
  };
  const handleDeleteTask = useCallback(async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        console.log(`Tarea con id ${id} eliminada de la base de datos.`);
      } else {
        console.error("Error al eliminar la tarea en la base de datos.");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud de eliminación:", error);
    }
  }, []);
  const confirmDeleteTask = () => {
    if (taskIdToDelete) {
      handleDeleteTask(taskIdToDelete);
    }
    handleCloseModalDelete();
  };

  // Add task
  const clearError = (field: string) => {
    dispatch({ type: "SET_ERROR", field, payload: false });
  };
  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    dispatch({
      type: "RESET_FORM",
      payload: {
        formData: initialFormData,
        errors: { title: false, category_id: false },
      },
    });
  };
  const showSnackbar = (
    message: string,
    severity: "success" | "warning",
    variant: "filled" | "standard",
    horizontal: "center" | "left",
    transition: "up" | "right"
  ) => {
    dispatch({ type: "SHOW_SNACKBAR", message, severity, variant, horizontal, transition });
  };
  const closeSnackbar = () => {
    dispatch({ type: "CLOSE_SNACKBAR" });
  };
  const handleFormChange = (field: string, value: string) => {
    dispatch({ type: "SET_FORM_DATA", field, payload: value });

    const isTitleExceeded = (field === "title" ? value : state.formData.title).length >= 40;
    const isDescriptionExceeded =
      (field === "description" ? value : state.formData.description).length >= 100;

    if (field === "title" && isTitleExceeded) {
      showSnackbar(
        "Alcanzaste el límite máximo de 40 caracteres en el título.",
        "warning",
        "standard",
        "center",
        "up"
      );
    } else if (field === "description" && isDescriptionExceeded) {
      showSnackbar(
        "Alcanzaste el límite máximo de 100 caracteres en la descripción.",
        "warning",
        "standard",
        "center",
        "up"
      );
    } else {
      closeSnackbar();
    }

    (field === "title" || field === "category_id") && clearError(field);
  };
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isTitleEmpty = state.formData.title.trim() === "";
    const isCategoryEmpty = state.formData.category_id.trim() === "";
    if (isTitleEmpty || isCategoryEmpty) {
      isTitleEmpty && dispatch({ type: "SET_ERROR", field: "title", payload: true });
      isCategoryEmpty && dispatch({ type: "SET_ERROR", field: "category_id", payload: true });
      return;
    }

    const selectedCategory = categories.find((cat) => cat.id === state.formData.category_id);
    const categoryName = selectedCategory ? selectedCategory.name : "";

    const taskData = {
      id: uuidv4(),
      title: `${categoryName}: ${state.formData.title}`,
      description: state.formData.description,
      category_id: state.formData.category_id,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (response.ok) {
        const data = await response.json();
        setTasks((prevTasks) => [...prevTasks, data]);
        handleCloseFormDialog();
        showSnackbar("Tarea creada con éxito", "success", "filled", "left", "right");
      } else {
        console.error("Error al crear la tarea");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return {
    tasks: filterTasks(),
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
  };
};
