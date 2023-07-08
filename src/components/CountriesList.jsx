import React, { useState, useEffect } from "react";
import { apiURL } from '../services/api';

import { Link } from "react-router-dom";
import SearchInputComponent from "./SearchComponent";
import FilterCountryComponent from "./FilterComponent";

const CountriesList = () => {
  
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCountriesData = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      console.log(data);

      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const response = await fetch(`${apiURL}/name/${countryName}`);

      if (!response.ok) throw new Error("Anything!");

      const data = await response.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const response = await fetch(`${apiURL}/region/${regionName}`);

      if (!response.ok) throw new Error("Failed..");

      const data = await response.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  return (
    <>
        <div className="wrapper">
          <div className="wrapper-container">
            <div className="head">
              <div className="search">
                <SearchInputComponent onSearch={getCountryByName} />
              </div>

              <div className="filter">
                <FilterCountryComponent onSelect={getCountryByRegion} />
              </div>
            </div>

            <div className="countriesList">
              {isLoading && !error && <h4>Loading........</h4>}
              {error && !isLoading && <h4>{error}</h4>}

              {countries?.map((country) => (
                <Link to={`/country/${country.name.common}`}>
                  <div className="card">
                    <div className="imgFlag">
                      <img src={country.flags.png} alt="" />
                    </div>

                    <div className="countryInfo">
                      <h5>{country.name.common}</h5>
                      <h6>
                        {" "}
                        Population:{" "}
                          <span>
                            {new Intl.NumberFormat().format(country.population)}
                          </span>
                      </h6>
                      <h6> Region: <span>{country.region}</span></h6>
                      <h6>Capital: <span>{country.capital}</span></h6>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
    
    </>
  );
};

export default CountriesList;
