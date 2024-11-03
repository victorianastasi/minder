import React from "react";
import {
  Box,
  Checkbox,
  Typography,
  FormControlLabel,
  Paper,
  styled,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomTaskProps, TaskItemProps } from "../interfaces/interfaces";

const CustomTask = styled(Paper)<CustomTaskProps>(({ bg }) => ({
  padding: ".5rem 1.5rem",
  display: "flex",
  backgroundColor: bg,
}));

const getCategoryColor = (
  category_id: string,
  categories: { id: string; name: string; color: string }[]
) => {
  const category = categories.find((cat) => cat.id === category_id);
  return category && category.color != null ? category.color : "#FFFFFF";
};

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  category_id,
  completed,
  onToggle,
  onDelete,
  categories,
}) => {
  return (
    <CustomTask elevation={3} bg={getCategoryColor(category_id, categories)}>
      <FormControlLabel
        sx={{ gap: 1.25, marginRight: 0, flexGrow: 1 }}
        control={
          <Checkbox
            checked={completed}
            onChange={onToggle}
            inputProps={{
              "aria-labelledby": `checkbox-label-${id}`,
            }}
            color="primary"
          />
        }
        label={
          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography id={`checkbox-label-${id}`} variant="body1" component="h3">
              {title}
            </Typography>
            <Typography variant="body2" component="h3">
              {description}
            </Typography>
          </Box>
        }
      />
      <IconButton aria-label="Eliminar" title="Eliminar" size="large" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </CustomTask>
  );
};

export default TaskItem;
