namespace AddressAutocomplete {
    export interface Response {
        results: Result[];
        query: Query;
    }

    export interface Result {
        country: string;
        country_code: string;
        state: string;
        city: string;
        datasource: Datasource;
        lon: number;
        lat: number;
        population: number;
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
        county?: string;
        postcode?: string;
        region?: string;
        municipality?: string;
        state_code?: string;
    }

    export interface Datasource {
        sourcename: string;
        attribution: string;
        license: string;
        url: string;
    }

    export interface Timezone {
        name: string;
        offset_STD: string;
        offset_STD_seconds: number;
        offset_DST: string;
        offset_DST_seconds: number;
        abbreviation_STD?: string;
        abbreviation_DST?: string;
    }

    export interface Rank {
        confidence: number;
        confidence_city_level: number;
        match_type: string;
    }

    export interface Bbox {
        lon1: number;
        lat1: number;
        lon2: number;
        lat2: number;
    }

    export interface Query {
        text: string;
        parsed: Parsed;
    }

    export interface Parsed {
        city: string;
        expected_type: string;
    }
}
