namespace ReverseGeocoder {
    export interface Response {
        results: Result[];
        query: Query;
    }

    export interface Result {
        datasource: Datasource;
        name: string;
        country: string;
        country_code: string;
        state: string;
        city: string;
        postcode: string;
        district: string;
        suburb: string;
        quarter: string;
        street: string;
        lon: number;
        lat: number;
        distance: number;
        result_type: string;
        formatted: string;
        address_line1: string;
        address_line2: string;
        category: string;
        timezone: Timezone;
        plus_code: string;
        plus_code_short: string;
        rank: Rank;
        place_id: string;
        bbox: Bbox;
    }

    export interface Datasource {
        sourcename: string;
        attribution: string;
        license: string;
        url: string;
    }

    export interface Timezone {
        name: string;
        name_alt: string;
        offset_STD: string;
        offset_STD_seconds: number;
        offset_DST: string;
        offset_DST_seconds: number;
    }

    export interface Rank {
        importance: number;
        popularity: number;
    }

    export interface Bbox {
        lon1: number;
        lat1: number;
        lon2: number;
        lat2: number;
    }

    export interface Query {
        lat: number;
        lon: number;
        plus_code: string;
    }
}
