import { createTheme } from "@mui/material";
import { blue, teal } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[200],
      dark: blue[700],
    },
    secondary: {
      main: teal[500],
    },
  },
});
