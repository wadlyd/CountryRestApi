import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiURL } from "../services/api";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const CountryPageInfo = () => {
  const isSmallScreen = useMediaQuery("(max-width: 550px)");

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
              background: "var(--header-input-bcg-color)",
              borderRadius: "5px",
            }}
          >
            <span>
              <KeyboardBackspaceIcon
                sx={{
                  fontSize: 18,
                  mr: 1,
                }}
              />
            </span>
            Back
          </div>
        </Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      {country?.map((countryItem, index) => (
        <div className="countryDataContainer" key={index}>
          <div className="countryImgFlag">
            <img src={countryItem.flags.png} alt="" />
          </div>

          <div className="info">
            <h3>{countryItem.name.common}</h3>

            <div className="countryData">
              <div>
                <h6>
                  Native Name: &nbsp;
                  <span>
                    {countryItem.name.nativeName
                      ? countryItem.name.nativeName[
                          Object.keys(countryItem.languages)?.at(-1)
                        ]?.common
                      : "N/A"}
                  </span>
                </h6>
                <h6>
                  Population:&nbsp;
                  <span>
                    {new Intl.NumberFormat().format(countryItem.population)}
                  </span>
                </h6>
                <h6>
                  Region: <span>{countryItem.region}</span>
                </h6>
                <h6>
                  Sub Region: <span>{countryItem.subregion}</span>
                </h6>
                <h6>
                  Capital:{" "}
                  <span>
                    {countryItem.capital && countryItem.capital.length > 0
                      ? countryItem.capital[0]
                      : "N/A"}
                  </span>
                </h6>
              </div>

              <div>
                <h6>
                  Top Level Domain: <span>{countryItem.tld[0]}</span>
                </h6>
                <h6>
                  Currencies:&nbsp;
                  <span>
                    {countryItem.currencies
                      ? Object.keys(countryItem.currencies)
                          .map((currectyKey) => {
                            return countryItem.currencies[currectyKey].name;
                          })
                          .join(", ")
                      : "N/A"}
                  </span>
                </h6>
                <h6>
                  Languages:&nbsp;
                  <span>
                    {countryItem.languages
                      ? Object.keys(countryItem.languages)
                          .map((language) => {
                            return countryItem.languages[language];
                          })
                          .join(", ")
                      : "N/A"}
                  </span>
                </h6>
              </div>
            </div>

            <Box
              sx={{
                display: isSmallScreen ? "block" : "flex",
                alignItems: "center",
              }}
            >
              <h3>Border Countries:</h3>&nbsp;
              <Box
                sx={{
                  display: "flex",
                  alignItems: isSmallScreen ? "center" : "",
                  justifyContent: isSmallScreen ? "center" : "",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {countryItem.borders ? (
                  countryItem.borders.map((border, index) => {
                    if (index < 3) {
                      return (
                        <button>
                          <Link to={`/country/${countryItem.name.common}`}>
                            <div
                              style={{
                                padding: "0 15px",
                              }}
                            >
                              {border}
                            </div>
                          </Link>
                        </button>
                      );
                    }
                    return null;
                  })
                ) : (
                  <button>
                    <Link to={`/`}>
                      <div
                        style={{
                          padding: "0 15px",
                        }}
                      >
                        No data
                      </div>
                    </Link>
                  </button>
                )}
              </Box>
            </Box>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryPageInfo;
