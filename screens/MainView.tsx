import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList, Image,
  StatusBar,
  StyleSheet,
  Text, TextInput,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';
import {
  getAllCountries,
  getFormatContinents
} from "../functions/countries.ts";
import View = Animated.View;
import {Dropdown} from "react-native-element-dropdown";
import {SafeAreaView} from "react-native-safe-area-context";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const BASE_URL = "https://evankoe.github.io/everBeen-next/";
const HEIGHT: number = Dimensions.get('window').height;
const WIDTH: number = Dimensions.get('window').width;
const BG_COLOR: string = "#222436";
const FG_COLOR: string = "#78a2d3";


const MainView = () => {
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [mapUrl, setMapUrl] = useState<string>(BASE_URL);
  const [countryList, setCountryList] = useState([]);
  const [isSearchDisplayed, setIsSearchDisplayed] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [selectedContinent, setSelectedContinent] = useState<string | undefined>(undefined);


  const getUrl = () => {
    if (selectedCountries.length === 0) {
      return BASE_URL;
    }

    let newUrl: string = BASE_URL + "?codes=";
    selectedCountries.forEach((code: string) => newUrl += code + ',');
    return newUrl.slice(0, -1);
  }

  const addOrRemoveCountry = (country: never) => {
    const iso: string = country['cca2'];
    if (selectedCountries.includes(iso, 0)) {
      return setSelectedCountries(selectedCountries.filter((c) => c !== iso));
    }
    return setSelectedCountries([ ...selectedCountries, iso ]);
  }


  const filterByContinent = () => {
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
    return setDisplayedCountries([ ...new_countries ]);
  }


  useEffect(() => {
    filterByContinent();

    if (!search) {
      return;
    }
    let new_countries = displayedCountries.filter((country) => {
      let name: string = country['name']['common'] ?? 'undefined';
      return name.toLowerCase().includes(search.toLowerCase());
    });
    setDisplayedCountries(new_countries);
  }, [search]);


  useEffect(() => {
    setMapUrl(getUrl());
    console.log(mapUrl);
  }, [selectedCountries]);


  useEffect(filterByContinent, [selectedContinent]);


  useEffect(() => {
    const newUrl: string = getUrl();
    setMapUrl(newUrl);
    getAllCountries()
    .then((countries: []) => {
      setCountryList([ ...countries ]);
      setDisplayedCountries([ ...countries ]);
    });
  }, []);


  useEffect(() => {
    console.log("pute");
  }, [mapUrl]);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={BG_COLOR} barStyle='light-content' />

      <WebView
        source={{ uri: mapUrl }}
        style={{ flex: 1, backgroundColor: BG_COLOR }}
        onError={() => ToastAndroid.show("Could not connect to the internet. Try again later", ToastAndroid.SHORT)}
      />

      <View
        style={styles.subcontainer}
      >
        <View style={{ flexDirection: 'row' }}>
          <Dropdown
            data={getFormatContinents()}
            labelField="label"
            valueField="value"
            value={selectedContinent}
            placeholder={selectedContinent ?? 'Select continent'}
            placeholderStyle={{ fontWeight: 'bold', color: '#ccc' }}
            onChange={(item) => setSelectedContinent(item.value)}
            style={styles.dropdown}
            itemContainerStyle={{ backgroundColor: BG_COLOR }}
            itemTextStyle={{ color: '#ccc' }}
            selectedTextStyle={{ color: '#ccc', fontWeight: 'bold' }}
            containerStyle={{ borderRadius: 12, borderWidth: 0 }}
          />

          <TouchableOpacity
            onPress={() => setIsSearchDisplayed(e => !e)}
            style={{ marginTop: 'auto', marginBottom: 'auto', marginHorizontal: 12 }}
          >
            {/* replace with an icon */}
            <FontAwesome5
              name="search"
              color={"#7C7B80"}
              size={16}
            />
          </TouchableOpacity>
        </View>

        { isSearchDisplayed && (
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              onChangeText={(e: string) => setSearch(e === "" ? undefined : e)}
              placeholder="Search..."
              style={styles.searchBar}
              placeholderTextColor={FG_COLOR}
            />
          </View>
        ) }

        <FlatList
          data={displayedCountries}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => addOrRemoveCountry(item)}
              style={[
                styles.countryItem,
                { backgroundColor: selectedCountries.some((code: string) => code === item['cca2']) ? FG_COLOR : '#70719B' }
              ]}
            >
              <Image
                source={{ uri: item['flags']['png'] }}
                style={{ width: 30, height: 20, borderRadius: 2 }}
              />
              <Text
                style={[
                  { marginHorizontal: 12 },
                  { color: selectedCountries.some((code: string) => code === item['cca2']) ? '#fff' : '#ddd' }
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
    flex: 1,
    margin: 16,
    height: 50,
    fontWeight: 'bold',
    color: '#ccc'
  },
  searchBar: {
    borderBottomWidth: 0.5,
    borderBottomColor: FG_COLOR,
    flex: 1,
    color: '#ccc'
  },
  countryItem: {
    flexDirection: 'row',
    marginVertical: 2,
    backgroundColor: '#70719B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 7
  }
});


export default MainView;