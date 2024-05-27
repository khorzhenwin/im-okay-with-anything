import {LocationInterface} from "@/utils/types/location";

export const getUserLocation = (): LocationInterface => {
    let location: LocationInterface = {
        latitude: "0",
        longitude: "0"
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
                location.latitude = position.coords.latitude.toString();
                location.longitude = position.coords.longitude.toString();
            }, (error) => {
                throw new Error(`Error getting user location: ${error}`);
            }
        );
    }

    return location;
}