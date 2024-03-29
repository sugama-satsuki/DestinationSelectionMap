/* eslint-disable no-undef */
import React from "react";

/* import Map */ 
import { GeoloniaMap } from "@geolonia/embed-react";
import H from '@here/maps-api-for-javascript';

/* import css */ 
import styles from './planDecisionContent.module.css';
import globalStyle from '../../../global.module.css';

/* import atoms */ 
import { BackBtn } from "../../atoms/button";




export default function PlanDecisionContent(props) {

    const { addDestListFunc, planDecisionFunc, destinationItems, backFunc, prefData } = props;


    /* ~~~~~~~~~ 定数・変数 ~~~~~~~~ */ 

    const [geoJson, setGeoJson] = React.useState({});
    const [center, setCenter] = React.useState({lng:127.96911949041572, lat:26.588972870618022});
    const mapRef = React.useRef(null);

    React.useEffect(() => {

    }, [destinationItems])


    /* ~~~~~~~~~ 関数 ~~~~~~~~ */ 

    // onLoad用　callback関数
    const handler = React.useCallback(() => {
        const map = mapRef.current;


        console.log(destinationItems);
        setGeoJson(() => { return destinationItems });
        setCenter({lng: prefData.lng, lat: prefData.lat});
        
        let lngLatStr = '';

        for(let e of destinationItems.features) {
            lngLatStr += lngLatStr===''? e.geometry.coordinates.join(',') : ';' + e.geometry.coordinates.join(',');
        }

        // ルート情報の検索
        const getRoute = async () => {
            const res = await fetch(
                `http://router.project-osrm.org/route/v1/driving/${lngLatStr}?overview=full&geometries=geojson`
            )
            .then((response) => response.json())
            .catch((err) => console.error(err));

            console.log(res);

            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': res.routes[0].geometry.coordinates
                    }
                }
            });

            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#0067c0',
                    'line-width': 5
                }
            });
        }

        getRoute();
        
        // マーカーの生成
        for(let i = 0; i < destinationItems.features.length; i++) {
            setMarker(destinationItems.features[i], map);
        }

    }, [destinationItems, prefData])


    // マーカーのセット
    const setMarker = (e, map) => {
        // popup
        const popup = new geolonia.Popup()
            .setText(e.properties.facilityName);
            
        // marker
        const marker = new geolonia.Marker({color: '#F9BF3D'})
            .setLngLat([e.geometry.coordinates[0], e.geometry.coordinates[1]])
            .setPopup(popup)
            .addTo(map);

        marker.getElement().style.cursor = 'pointer';
    }


    /* ~~~~~~~~~ return ~~~~~~~~ */ 

    return (
        <div className={`${styles.content__inner} ${styles.destinationFixed} ${globalStyle.content_fadeIn}`}>
            <div className={styles.mainContent_header}>
                <div className={styles.destinationArea}>
                    <BackBtn text="行き先を選ぶ" onclick={backFunc} />
                    <p className={`${styles.title} ${globalStyle.paddingLeft_m} ${globalStyle.paddingBottom_xs}`}>最高の旅にしましょう♪</p>
                    <p className={`${styles.destination} ${globalStyle.paddingLeft_m}`}>最短経路を表示しています。</p>
                </div>
            </div>
            <div>
                <div><p>出発地を入力</p></div>
                <div></div>
            </div>
            <div className={`${styles.wideMap} ${styles.mapArea}`}>
                <GeoloniaMap 
                    apiKey={"3407afe23e7c46cca1391c93f9f84567"}
                    style={{height: "506px", width: "100%"}}
                    geojson={geoJson}
                    lat={center.lat}
                    lng={center.lng}
                    onLoad={handler}
                    zoom="8"
                    marker="off"
                    mapRef={mapRef}
                />
                <div className={`${styles.text_contents} ${globalStyle.padding_none} ${globalStyle.bgWhite}`}>
                    <ul className={styles.routeList}>
                        { geoJson.features && geoJson.features.map((val, index) => {
                            const prop = val.properties;
                            return (
                                <li key={index}>
                                    <span className={styles.sub_title}>{prop.prefecture + "：" +  prop.category}</span>
                                    <span className={styles.title}>{prop.facilityName}</span>
                                    <span className={styles.description}>10km 10分</span>
                                </li>
                            )
                        }) }
                    </ul>
                </div>
            </div>
        </div>
    )
}