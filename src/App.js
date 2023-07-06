import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CountriesList from "./components/CountriesList";
import CountryPageInfo from "./page/CountryPage";
// import HeaderComponent from "./components/HeaderComponent";

function App() {
  return (
    <>
      {/* <HeaderComponent /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/country/:countryName" element={<CountryPageInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
