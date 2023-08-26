import React from "react";
import TextField from "@mui/material/TextField";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (newQuery: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      fullWidth
    />
  );
};

export default SearchInput;
