import React from "react";
import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { FilterByCategoriesProps } from "../interfaces/interfaces";

const FilterByCategories: React.FC<FilterByCategoriesProps> = ({ categories, handleCategoryChange, categoryFilter  }) => {
  return (
    <Box maxWidth="300px" sx={{ml: "auto"}}>
      <FormControl size="small" sx={{ minWidth: "100%" }}>
          <Typography variant="subtitle2" component="h2" sx={{textAlign: "right", fontSize: "1rem"}} gutterBottom>
            Filtrar por categoría
          </Typography>
          <Select
            value={categoryFilter ?? ""}
            onChange={handleCategoryChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">Todas las categorías</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id} >
                <Box component="span" sx={{backgroundColor: category.color ? category.color : "#FFFFFF", display: "inline-block", mr: 1, borderRadius: "50%", width: ".75rem", height: ".75rem"}}></Box>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
  );
};

export default FilterByCategories;
