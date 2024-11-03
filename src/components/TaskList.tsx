import React from "react";
import { Box, Typography, Stack, Alert, AlertTitle } from "@mui/material";
import TaskItem from "./TaskItem";
import { TaskListProps } from "../interfaces/interfaces";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  categories,
  onToggle,
  onDelete,
  tasksCompleted,
}) => {
  return (
    <>
      <Box component="section" sx={{ py: 2 }}>
        <Typography component="h2" variant="h6" gutterBottom sx={{mb: 1}}>
          {tasksCompleted ? "Terminadas" : "Pendientes"}
        </Typography>
        <Stack spacing={2}>
          {tasks.length === 0 ? (
            <Box sx={{ py: 3, mx: "auto" }}>
              <Alert
                variant="outlined"
                severity={tasksCompleted ? "warning" : "success"}
                sx={{ maxWidth: "sm", mx: "auto" }}
              >
                <AlertTitle sx={{ mb: 0, fontSize: "18px" }}>
                  {tasksCompleted
                    ? "No hay tareas terminadas aún, fuerza 💪💪🚀"
                    : "No hay tareas pendientes 😀😎🎉"}
                </AlertTitle>
              </Alert>
            </Box>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                id={task.id}
                description={task.description}
                category_id={task.category_id}
                completed={task.completed}
                onToggle={() => onToggle(task.id)}
                onDelete={() => onDelete(task.id)}
                categories={categories}
              />
            ))
          )}
        </Stack>
      </Box>
    </>
  );
};

export default TaskList;
