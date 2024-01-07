import React, { useState } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { CountryType, JsonCountryFormat } from '../types';
import { countries } from '../assets/countries.json';


const BASE_URL = "https://evankoe.github.io/everBeen-next/"


const MainView = () => {
  const [displayedCountries, setDisplayedCountries] = useState<CountryType[]>(countries);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);


  const getUrl = () => {
    if (selectedCountries.length === 0) {
      return BASE_URL;
    }

    let newUrl: string = BASE_URL + "?codes=";
    selectedCountries.forEach((code: string) => newUrl + code + ',');
    return newUrl.slice(0, -1);
  }


  const groupByContinent = () => {
    // function to group by continent
    return displayedCountries;
  }


  return (
    <>
      <Text>Main view</Text>

      <WebView
        source={{ uri: getUrl() }}
      />

    </>
  );
}


export default MainView;
