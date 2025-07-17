declare namespace AddressAutocomplete {
  interface Result {
    formatted: string;
    lat: string;
    lon: string;
    place_id: string;
  }
}

declare namespace RestaurantFinder {
  interface Feature {
    properties: {
      place_id: string;
      formatted?: string;
      name?: string;
      name_international?: {
        en?: string;
      };
      catering?: {
        cuisine?: string;
      };
    };
  }
}

declare namespace ReverseGeocoder {
  interface Result {
    formatted: string;
    lat: string;
    lon: string;
    place_id: string;
  }
}