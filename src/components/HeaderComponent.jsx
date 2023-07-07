import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const HeaderComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = () => {
    isDarkMode === "dark-theme" ? setIsDarkMode("light-theme") : setIsDarkMode("dark-theme");
  }
  
  useEffect(() => {
    document.body.className = isDarkMode;
  })
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="header">
        <div>
          <h3>
            Where in the world?
          </h3>
          </div>
          <div>
          
          <Button onClick={() => handleClick()} color="inherit">
            <DarkModeIcon 
              sx={{ 
                fontSize: 20,
                mr: 2,
              }}
            />
              {isDarkMode === "dark-theme"?
                <span>Dark Mode</span>
                :
                <span>Light Mode</span>
              }
              
          </Button>
        </div>
      </Box>
    </Box>
  );
}

export default HeaderComponent;