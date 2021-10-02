// import logo from './logo.svg';
// import './App.css';

import { sortBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/countrySelector/CountrySelector";
import HighLight from "./components/highLight/HighLight";
import Summary from "./components/summary/Summary";
import {Container} from '@material-ui/core';
import '@fontsource/roboto';

function App() {
  const[countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([])
  useEffect(()=>{
    getCountries()
      .then(res => {
        const countries = sortBy(res.data, 'Country');
        setCountries(countries)
        setSelectedCountryId('vn')
      })
  },[])
  const handleOnChange = useCallback((e)=>{
    setSelectedCountryId(e.target.value)
  },[])
  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId)
      getReportByCountry(Slug).then((res)=>{
        res.data.pop();
        setReport(res.data)
      });
    }
  }, [countries, selectedCountryId])

  console.log(report);
  //-------------------------
  return (
    <Container style={{ paddingTop: '30px' }}>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <HighLight report={report} />
      <Summary
        report={report}
        countryId={selectedCountryId}
      />
    </Container>
  );
}

export default App;
