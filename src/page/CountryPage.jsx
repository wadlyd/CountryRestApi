import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiURL } from "../services/api";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const CountryPageInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  // const borders = country.map((country) => country.borders); 


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
                  // ml: 5,
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
                            Native Name: {' '}
                            {/* {Object.keys(country.name.nativeName).map((val, index) => {
                                if (index === 0) {
                                    return <span key={index}>{country.name.nativeName[val].common}</span>
                                }
                                return false
                            })} */}

                            {/* {country.name.nativeName ? (
                              Object.keys(country.name.nativeName).map((val, index) => (
                                <span key={index}>{country.name.nativeName[val].common}</span>
                              ))
                            ) : (
                              <span>Native name not available</span>
                            )} */}
                        </h6>
                        <h6>
                            Population:{" "}
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
                            Capital: <span>{country.capital[0]}</span>
                        </h6>
                    </div>

                    <div>
                        <h6>
                            Top Level Domain: <span>{country.tld[0]}</span>

                        </h6>
                        <h6>Currencies: {' '}
                          <span>
                            {Object.keys(country.currencies).map((val, index, arr) => {
                              if (index < 2) {
                                if (index !== arr.length - 1) {
                                    return <span key={index}>{`${country.currencies[val].name}, `}</span>
                                } else {
                                    return <span key={index}>{`${country.currencies[val].name}`}</span>
                                }
                              } return false
                            })}
                          </span>
                        </h6>
                        <h6>Languages:{" "} 
                          <span>
                            {Object.keys(country.languages).map((val, index, arr) => {
                              if (index < 3) {
                                if (index !== arr.length - 1 && index < 2) {
                                    return <span key={index}>{`${country.languages[val]}, `}</span>
                                } else {
                                    return <span key={index}>{`${country.languages[val]}`}</span>
                                }
                              } return false
                            })}
                            </span></h6>
                    </div>
                </div>
            
                <div>
                    Border Countries: {' '}
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CountryPageInfo;
