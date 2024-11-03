import { PaperProps, SelectChangeEvent } from "@mui/material";

export interface TaskType {
  id: string;
  title: string;
  description: string;
  category_id: string;
  completed: boolean;
}
export interface CategoriesType {
  id: string;
  name: string;
  color: string;
}
export interface TaskFormData {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
}
export interface CustomTaskProps extends PaperProps {
  bg?: string;
}
export interface FilterByCategoriesProps {
  categories: CategoriesType[];
  handleCategoryChange: (event: SelectChangeEvent<string>) => void;
  categoryFilter: string;
}
export interface TaskItemProps extends TaskType {
  onToggle: () => void;
  onDelete: () => void;
  categories: CategoriesType[];
}
export interface TaskListProps {
  tasks: TaskType[];
  categories: CategoriesType[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  tasksCompleted: boolean;
}
export interface DeleteTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export interface FormState {
  formData: TaskType;
  errors: { title: boolean; category_id: boolean };
  snackbar: {
    open: boolean;
    message: string;
    severity: "success" | "warning";
    variant: "filled" | "standard";
    horizontal: "center" | "left";
    transition: "up" | "right";
  };
}
export interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  handleCloseSnackbar: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  categories: CategoriesType[];
  formState: FormState;
  handleFormChange: (field: string, value: string) => void;
}
export type FormAction =
  | { type: "SET_FORM_DATA"; field: string; payload: string | boolean }
  | { type: "SET_ERROR"; field: string; payload: boolean }
  | {
      type: "SHOW_SNACKBAR";
      message: string;
      severity: "success" | "warning";
      variant: "filled" | "standard";
      horizontal: "center" | "left";
      transition: "up" | "right";
    }
  | { type: "CLOSE_SNACKBAR" }
  | { type: "RESET_FORM"; payload: { formData: TaskType; errors: FormState["errors"] } };
