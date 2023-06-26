

export async function getOkinawaMuseum() {

    let geoJson = await fetch("http://localhost:9000/api/okinawaMuseumData");
    console.log("call geoJson - getOkinawa:", geoJson.json());
    return geoJson;

}

export const getTakamatsuCarParking = async() => {

    const endpoint = 'https://geolonia.github.io/style-demo-source/takamatsu-car-parking.json';
    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
}


export const getPrefecture = async() => {
    const endpoint = 'https://geolonia.github.io/japanese-prefectural-capitals/index.json';
    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
}
