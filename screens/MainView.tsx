import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, FlatList, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import {
  getAllCountries,
  getFormatContinents
} from "../functions/countries.ts";
import View = Animated.View;
import {Dropdown} from "react-native-element-dropdown";
import {SafeAreaView} from "react-native-safe-area-context";


const BASE_URL = "https://evankoe.github.io/everBeen-next/";
const HEIGHT: number = Dimensions.get('window').height;
const WIDTH: number = Dimensions.get('window').width;
const BG_COLOR: string = "#222436";


const MainView = () => {
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [mapUrl, setMapUrl] = useState<string>(BASE_URL);
  const [countryList, setCountryList] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState<string | undefined>(undefined);


  const getUrl = () => {
    if (selectedCountries.length === 0) {
      return BASE_URL;
    }

    let newUrl: string = BASE_URL + "?codes=";
    selectedCountries.forEach((code: string) => newUrl + code + ',');
    console.log(selectedCountries);
    return newUrl.slice(0, -1);
  }

  const addOrRemoveCountry = (country: never) => {
    const iso: string = country['cca2'];
    if (selectedCountries.includes(iso, 0)) {
      return setSelectedCountries(selectedCountries.filter((c) => c !== iso));
    }
    return setSelectedCountries([ ...selectedCountries, iso ]);
  }


  useEffect(() => {
    setMapUrl(getUrl());
  }, [selectedCountries]);


  useEffect(() => {
    if (!selectedContinent) {
      return
    }

    let new_countries = countryList.filter((country) => {
      let continents: string[] = country['continents'] ?? [];

      if (!continents || continents.length === 0) {
        return false;
      }
      return continents.some((continent: string) => selectedContinent === continent);
    });
    setDisplayedCountries([ ...new_countries ]);
  }, [selectedContinent]);


  useEffect(() => {
    const newUrl: string = getUrl();
    setMapUrl(newUrl);
    getAllCountries()
    .then((countries: []) => {
      setCountryList([ ...countries ]);
      setDisplayedCountries([ ...countries ]);
    });
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BG_COLOR} barStyle='light-content' />

      <WebView
        source={{ uri: mapUrl }}
        style={{ flex: 1 }}
      />

      <View
        style={styles.subcontainer}
      >
        <Dropdown
          data={getFormatContinents()}
          labelField="label"
          valueField="value"
          value={selectedContinent}
          placeholder={selectedContinent ?? 'Select continent'}
          placeholderStyle={{ fontWeight: 'bold', color: '#ccc' }}
          onChange={(item) => setSelectedContinent(item.value)}
          style={styles.dropdown}
          mode="modal"
        />

        <FlatList
          data={displayedCountries}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => addOrRemoveCountry(item)}
            >
              <Text
                style={[
                  { color: selectedCountries.some((code: string) => code === item['cca2']) ? '#78a2d3' : '#ccc' }
                ]}
              >{ item['name']['common'] }</Text>
            </TouchableOpacity>
          )}
        />
      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    flex: 1
  },
  subcontainer: {
    flex: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#3d4161',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    fontWeight: 'bold',
    color: '#ccc'
  }
});


export default MainView;