import 'dotenv/config'

const GEOAPIFY_API_KEY: string | undefined = process.env.GEOAPIFY_KEY;

export const getUserLocation = async (): Promise<string> => {
    let locationName: string = '';
    const url = `https://api.geoapify.com/v1/ipinfo?apiKey=${GEOAPIFY_API_KEY}`

    await fetch(`${url}`)
        .then(response => response.json())
        .then(data => locationName = data.city.name + ', ' + data.country.name)

    return locationName;
}
