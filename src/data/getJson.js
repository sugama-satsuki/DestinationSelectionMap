
import axios from 'axios';

export async function getOkinawaMuseum() {

    const res = await axios.get("http://localhost:9000/api/okinawaMuseumData");
    const data = res.data;
    console.log("call geoJson - getOkinawa:", data);
    return data;
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
