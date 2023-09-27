const { normalize } = require('@geolonia/normalize-japanese-addresses')


export async function getOkinawaMuseum(pref, cate) {

    const prefName = await normalize(pref);
    const prefLngLat = {
        'okinawa': {lat: 26.212445, lng: 127.680922},
        'hokkaido': {lat: 43.064310, lng: 141.346879},
        'tokyo': {lat: 35.689501, lng: 139.691722}
    }
    const res = await fetch('https://overpass-api.de/api/interpreter', 
                    {
                        method: 'POST', 
                        body: `
                            [out:json][timeout:25];
                            area["name"="${prefName.pref}"];
                            node(area)["tourism"="${cate}"];
                            out;
                        ` 
                    });

    const data = await res.json();
    let lngLat;

    switch (pref) {
        case '沖縄':
            lngLat = prefLngLat.okinawa;
            break;
        case '北海道':
            lngLat = prefLngLat.hokkaido;
            break;
        default:
            lngLat = prefLngLat.tokyo;
    }
    return {data, lngLat};
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
