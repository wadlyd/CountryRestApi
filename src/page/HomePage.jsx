import React from 'react'
import CountriesList from '../components/CountriesList'
import HeaderComponent from '../components/HeaderComponent'
import { Route, Routes } from 'react-router-dom'
import CountryPageInfo from './CountryPage'

const HomePage = () => {
  return (
    <div className="container">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/country/:countryName" element={<CountryPageInfo />} />
        </Routes>
      </div>
  )
}

export default HomePage
