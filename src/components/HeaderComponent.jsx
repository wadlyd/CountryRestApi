import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const HeaderComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  function handleClick(){
    setIsDarkMode(!isDarkMode)
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: isDarkMode ? "hsl(207, 26%, 17%)" : "rgba(255, 255, 255, 0.87)",
        color: isDarkMode? "rgba(255, 255, 255, 0.87)" : "#000000",
        position: "fixed",
        pl: 10,
        pt: 3,
        pr: 8,
        pb: 3,
      }}>
        <div>
          <h3>
            Where in the world?
          </h3>
          </div>
          <div>
          
          <Button onClick={handleClick} color="inherit">
            <DarkModeIcon 
              sx={{ 
                fontSize: 20,
                mr: 2,
              }}
            /> 
            <span>Dark Mode</span>
          </Button>
        </div>
      </AppBar>
    </Box>
  );
}

export default HeaderComponent;