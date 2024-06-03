namespace RestaurantFinder {
    export interface Response {
        type: string;
        features: Feature[];
    }

    export interface Feature {
        type: string;
        properties: Properties;
        geometry: Geometry;
    }

    export interface Properties {
        country?: string;
        country_code?: string;
        state?: string;
        city?: string;
        postcode?: string;
        district?: string;
        neighbourhood?: string;
        suburb?: string;
        street?: string;
        lon: number;
        lat: number;
        formatted?: string;
        address_line1?: string;
        address_line2?: string;
        categories: string[];
        details: string[];
        datasource: Datasource;
        distance: number;
        place_id: string;
        name?: string;
        brand?: string;
        brand_details?: BrandDetails;
        catering?: Catering;
        housenumber?: string;
        opening_hours?: string;
        contact?: Contact;
        facilities?: Facilities;
        town?: string;
        name_international?: NameInternational;
        quarter?: string;
        building?: Building;
        website?: string;
        branch?: string;
        retail?: string;
    }

    export interface Datasource {
        sourcename: string;
        attribution: string;
        license: string;
        url: string;
        raw: Raw;
    }

    export interface Raw {
        osm_id: number;
        amenity: string;
        osm_type: string;
        "addr:street"?: string;
        name?: string;
        brand?: string;
        cuisine?: string;
        "brand:wikidata"?: string;
        "brand:wikipedia"?: string;
        phone?: string;
        delivery?: string;
        "addr:city"?: string;
        "addr:postcode"?: number;
        opening_hours?: string;
        "addr:housenumber": any;
        level?: number;
        toilets?: string;
        takeaway?: string;
        changing_table?: string;
        outdoor_seating?: string;
        "name:zh"?: string;
        building?: string;
        smoking?: string;
        "name:ms"?: string;
        "name:zh-Hans"?: string;
        "name:zh-Hant"?: string;
        "name:en"?: string;
        website?: string;
        branch?: string;
        is_in?: string;
        internet_access?: string;
        "addr:place"?: string;
        "diet:meat"?: string;
        "diet:halal"?: string;
        "diet:local"?: string;
        "building:part"?: string;
    }

    export interface BrandDetails {
        wikidata: string;
        wikipedia?: string;
    }

    export interface Catering {
        cuisine: string;
        diet?: Diet;
    }

    export interface Diet {
        halal?: boolean;
        local?: boolean;
        meat?: boolean;
    }

    export interface Contact {
        phone: string;
    }

    export interface Facilities {
        smoking?: boolean;
        internet_access?: boolean;
        toilets?: boolean;
        changing_table?: boolean;
        outdoor_seating?: boolean;
        takeaway?: boolean;
        delivery?: boolean;
    }

    export interface NameInternational {
        zh?: string;
        en?: string;
        ms?: string;
    }

    export interface Building {
        type: string;
    }

    export interface Geometry {
        type: string;
        coordinates: number[];
    }
}
