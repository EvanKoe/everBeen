const BASE_URL: string = "https://restcountries.com/v3.1";


type ContinentType = {
  label: string,
  value: string
};


const fetchCountryAPI = async (url: string) => {
  let route = url[0] === '/' ? url : '/' + url;

  const response = await fetch(BASE_URL + route);
  const data = await response.json();
  return data;
}


const getCountryIsoFromName = async (countryName: string) => {
  const data = await fetchCountryAPI('/name/' + countryName);
  const isoCode: string = data[0]['cca2'];
  return isoCode;
}


const getAllCountries = async () => {
  const data = await fetchCountryAPI('/all');
  return data;
}


// Send the list of countries that getAllCountries() returned
const getContinents = (countryList: [] | never[]) => {
  let continents: ContinentType[] = [];

  countryList.map((country: any) => {
    const countryContinents: string[] = [ ...(country['continents']) ];
    countryContinents.map((continent: string) => {
      if (continents.some((value) => value?.label === continent)) {
        continents.push({
          label: continent,
          value: continent
        });
      }
    })
  });

  return continents;
}


export {
  getCountryIsoFromName,
  getAllCountries,
  getContinents
};

export type { ContinentType };