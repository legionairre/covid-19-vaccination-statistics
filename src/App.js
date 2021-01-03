import React, { useState, useEffect } from 'react';
import './App.css';

import axios from "axios";
import { CustomBarChart } from "./CustomBarChart";

const App = () => {

  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    axios.get(`https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json`)
      .then(res => {
        const { data } = res;
        const tempCountries = [];

        Object.values(data).forEach(country => {
          if ( country.total_vaccinations )
            tempCountries.push({
              location: country.location,
              total_vaccinations: country.total_vaccinations
            })
        })

        tempCountries.sort(
          (a,b) => (a.total_vaccinations > b.total_vaccinations) ? -1 :
            ((b.total_vaccinations > a.total_vaccinations) ? 1 : 0));

        setCountries(tempCountries);
      })
  }, []);

  return (
    <div className="App">
      <p className={'header'}>COVID-19 VACCINATION STATISTICS</p>
      <p className={'header'}>{new Date().toDateString()}</p>
      {countries ? <CustomBarChart data={countries} xKey="location" yKey="total_vaccinations"/> : null}
    </div>
  );
}

export default App;
