# To-Do List

## Descripción
Aplicación web para el seguimiento de tareas utilizando React y librería MUI.

## Características
- Pantalla con listas de tareas separadas según su estado: terminadas y pendientes.
- Se puede marcar tareas pendientes como terminadas o desmarcar tareas terminadas para volverlas a pendientes.
- Las tareas muestran un fondo según el color asignado a su categoría; si la categoría no tiene color, el fondo es blanco.
- El botón con el ícono "+" despliega un formulario para crear nuevas tareas con los campos título, descripción y categoría.
- Validación de los campos obligatorios (título y categoría) cuando están vacíos.
- Se muestran notificaciones al crear una tarea o si se alcanza el máximo de caracteres en los campos de título y descripción.
- Las tareas se guardan en una base de datos mediante una API REST para persistencia.
- Cada tarea tiene un botón para eliminarla, que incluye un modal de confirmación.
- Opción de filtrar las tareas según su categoría.

## ¿Cómo ejecutar?
Para iniciar la API REST (json-server) ejecutar ```npm run db```.

Para inciar la aplicación ejecutar ```npm run dev```.
