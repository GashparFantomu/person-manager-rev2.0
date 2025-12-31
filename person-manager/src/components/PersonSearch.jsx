import { TextField } from "@mui/material";
import React from "react";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";


const PersonSearch = ({searchValue, onChange}) => {
    return(<TextField
      fullWidth
      variant="outlined"
      placeholder="Caută după nume, CNP, serie... ce dumniezo vrei"
      value={searchValue} 
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 4 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        ),
      }}
    />);
};

export default PersonSearch;