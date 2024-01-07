type CountryType = {
  type: string;
  properties: {
    scalerank: number;
    featurecla: string | null;
    LABELRANK: number;
    SOVEREIGNT: string | null;
    SOV_A3: string | null;
    ADM0_DIF: number;
    LEVEL: number;
    TYPE: string | null;
    ADMIN: string | null;
    ADM0_A3: string | null;
    GEOU_DIF: number;
    GEOUNIT: string | null;
    GU_A3: string | null;
    SU_DIF: number;
    SUBUNIT: string | null;
    SU_A3: string | null;
    BRK_DIFF: number;
    NAME: string; // name of the country
    NAME_LONG: string | null;
    BRK_A3: string | null;
    BRK_NAME: string | null;
    BRK_GROUP: string | null;
    ABBREV: string | null;
    POSTAL: string; // postal code in two characters
    FORMAL_EN: string | null;
    FORMAL_FR: string | null;
    NAME_CIAWF: string | null;
    NOTE_ADM0: string | null;
    NOTE_BRK: string | null;
    NAME_SORT: string | null;
    NAME_ALT: string | null;
    MAPCOLOR7: number;
    MAPCOLOR8: number;
    MAPCOLOR9: number;
    MAPCOLOR13: number;
    POP_EST: number;
    POP_RANK: number;
    GDP_MD_EST: number;
    POP_YEAR: number;
    LASTCENSUS: number;
    GDP_YEAR: number;
    ECONOMY: string | null;
    INCOME_GRP: string | null;
    WIKIPEDIA: number;
    FIPS_10_: string | null;
    ISO_A2: string | null;
    ISO_A3: string | null;
    ISO_A3_EH: string | null;
    ISO_N3: string | null;
    UN_A3: string | null;
    WB_A2: string | null;
    WB_A3: string | null;
    WOE_ID: number;
    WOE_ID_EH: number;
    WOE_NOTE: string | null;
    ADM0_A3_IS: string | null;
    ADM0_A3_US: string | null;
    ADM0_A3_UN: number;
    ADM0_A3_WB: number;
    CONTINENT: string | null;
    REGION_UN: string | null;
    SUBREGION: string | null;
    REGION_WB: string | null;
    NAME_LEN: number;
    LONG_LEN: number;
    ABBREV_LEN: number;
    TINY: number;
    HOMEPART: number;
    MIN_ZOOM: number;
    MIN_LABEL: number;
    MAX_LABEL: number;
  };
  geometry: {
    type: string | null;
    coordinates: any[]
  }
};


type JsonCountryFormat = {
  "countries": CountryType[];
};


export type {
  JsonCountryFormat,
  CountryType
}
