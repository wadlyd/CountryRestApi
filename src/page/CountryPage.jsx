import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiURL } from "../services/api";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box } from "@mui/material";
import { useMediaQuery } from '@mui/material';


const CountryPageInfo = () => {
  const isSmallScreen = useMediaQuery('(max-width: 550px)');


  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="countryPageWrapper">
      <button>
        <Link to="/">
          <div 
            style={{ 
              display: "flex", 
              padding: "0 15px",
              alignItems: "center", 
              background: 'var(--header-input-bcg-color)', borderRadius: '5px' 
            }}
          >
            <span>
              <KeyboardBackspaceIcon
                sx={{
                  fontSize: 18,
                  mr: 1,
                }} />
            </span>
            Back
          </div>
          </Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <div className="countryDataContainer" key={index}>
            <div className="countryImgFlag">
                <img src={country.flags.png} alt="" />
            </div>

            <div className="info">
                <h3>{country.name.common}</h3>

                <div className="countryData">
                    <div>
                        <h6>
                            Native Name: &nbsp;
                            <span>
                              {country.name?.nativeName[Object.keys(country.languages).at(-1)]?.common}
                            </span>
                        </h6>
                        <h6>
                            Population:&nbsp;
                            <span>
                                {new Intl.NumberFormat().format(country.population)}
                            </span>
                        </h6>
                        <h6>
                            Region: <span>{country.region}</span>
                        </h6>
                        <h6>
                            Sub Region: <span>{country.subregion}</span>
                        </h6>
                        <h6>
                            Capital: <span>{ country.capital.length > 0 ? country.capital[0] : 'none' }</span>
                        </h6>
                    </div>

                    <div>
                        <h6>
                            Top Level Domain: <span>{country.tld[0]}</span>

                        </h6>
                        <h6>Currencies:&nbsp;
                          <span>
                          { Object.keys(country.currencies).map((currectyKey) => {
                                return country.currencies[currectyKey].name
                            }).join(', ') }
                          </span>
                        </h6>
                        <h6>Languages:&nbsp; 
                          <span>      
                            { Object.keys(country.languages).map((language) => {
                                return country.languages[language];
                                }).join(', ') 
                            }
                          </span>
                        </h6>
                    </div>
                </div>
            
                <Box
                  sx={{
                    display: isSmallScreen ? "block" :'flex',
                    alignItems: 'center',
                  }}
                  >
                    <h3>Border Countries:</h3>&nbsp;
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: isSmallScreen ? 'center' : '',
                        justifyContent: isSmallScreen ? 'center' : '',
                        flexWrap: 'wrap',
                        gap: 2,
                      }}>

                      {country.borders ?
                        country.borders.map((border, index) => {
                          if (index < 3) {
                            return (
                              <button>
                                <Link to={`/country/${country.name.common}`}>
                                  <div
                                    style={{
                                      padding: "0 15px"
                                    }}
                                  >
                                    {border}                                    
                                  </div>
                                </Link>
                              </button>
                            )
                          }
                          return null;
                        }) :
                        <button>
                          <Link to={`/`}>
                            <div 
                              style={{
                                  padding: "0 15px"
                              }}
                            >
                              No data                                    
                            </div>
                          </Link>
                        </button>
                      }
                    </Box>
                </Box>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CountryPageInfo;
