import React, { useEffect, useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const HeaderComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleDarkMode = () => {
    isDarkMode !== "dark-theme" ? setIsDarkMode("dark-theme") : setIsDarkMode("light-theme");
  }
  
  useEffect(() => {
    document.body.className = isDarkMode;
  })
  return (
      <header className='header'>
        <div className='header-container'>
          <div>
            <h3>
              Where in the world?
            </h3>
          </div>
          <div> 
            <button onClick={() => handleDarkMode()} >
              {isDarkMode === "dark-theme"?
                <>
                  <span>
                    <DarkModeIcon
                      sx={{
                        fontSize: 15,
                        mr: 1,
                        }} 
                    />
                  </span>
                    <p>Dark Mode</p>
                </>
                  :
                <>
                  <span>
                    <DarkModeIcon
                      sx={{
                        fontSize: 15,
                        mr: 1,
                      }} 
                    />
                  </span>
                  <p>Light Mode</p>
                </>
              }
                
            </button>
          </div>
        </div>
      </header>
  );
}

export default HeaderComponent;

