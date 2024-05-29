import 'dotenv/config'

const GEOAPIFY_API_KEY: string | undefined = process.env.GEOAPIFY_KEY;

export const getUserLocation = async (userIp: string): Promise<string> => {
    console.log(userIp);
    let locationName: string = '';
    const url = userIp || userIp === ""
        ? `https://api.geoapify.com/v1/ipinfo?apiKey=${GEOAPIFY_API_KEY}`
        : `https://api.geoapify.com/v1/ipinfo?ip=${userIp}$apiKey=${GEOAPIFY_API_KEY}`;

    await fetch(`${url}`)
        .then(response => response.json())
        .then(data => locationName = data.city.name + ', ' + data.country.name)

    return locationName;
}

export const getUserIp = async (): Promise<string> => {
    return await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}