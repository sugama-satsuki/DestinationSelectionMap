
import axios from 'axios';

export async function getOkinawaMuseum(pref, cate) {

    const res = await fetch('https://overpass-api.de/api/interpreter', 
                    {
                        method: 'POST', 
                        body: `[out:json][timeout:25];
                                area(id:3603795635)->.searchArea;
                                // gather results
                                (
                                    node["tourism"="${cate}"](area.searchArea);
                                );
                                // print results
                                out body;
                                >;
                                out skel qt;` 
                    });

    const data = await res.json();
    console.log(data)
    
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
