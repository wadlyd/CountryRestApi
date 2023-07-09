import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";

const SearchInputComponent = ({ onSearch,  }) => {
  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onSearch(input);
  };

  return (
    <form onSubmit={submitHandler}>
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          background: 'var(--header-input-bcg-color)', borderRadius: '5px' 
        }}>
        <span>
          <SearchIcon
            sx={{
              fontSize: 20,
              ml: 3,
            }} 
          />
        </span>
        <input
          type="text"
          placeholder="Search for a country..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchInputComponent;