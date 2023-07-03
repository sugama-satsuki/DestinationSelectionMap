/* eslint-disable no-undef */
import React from "react";

/* import Map */ 
import { GeoloniaMap } from "@geolonia/embed-react";


/* import css */ 
import styles from './pinSelectContent.module.css';
import globalStyle from '../../../global.module.css';

/* import atoms */ 
import Button from "../../atoms/button";
import Spacer from "../../atoms/spacer";

/* import organisms */ 
import SearchArea from "../searchArea";

/* import mui */ 
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import data from "./example.geojson";
import StyleSelector from "../../atoms/styleSelector/styleSelector";



export default function PinSelectContent(props) {

    const { addDestListFunc, delDestListFunc, planDecisionFunc, itemList, pref, cate, geoData, searchFunc } = props;

    /* ~~~~~~~~~ 定数・変数 ~~~~~~~~ */ 

    const [geoJson, setGeoJson] = React.useState("");
    const [markerInfo, setMarkerInfo] = React.useState({lng: 0, lat: 0, name: ""});
    const [center, setCenter] = React.useState({lng:127.96911949041572, lat:26.588972870618022});
    const [styleIdentifier, setStyleIdentifier] = React.useState('geolonia/basic');
    const mapRef = React.useRef(null);

    const styleSelectorStyle = {
        margin: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        fontSize: '18px',
        height: '36px',
        boxSizing: 'border-box',
        border: '1px solid #cccccc',
        borderRadius: '0',
        outline: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
    };
    
    React.useEffect(() => {
        setGeoJson(() => {return geoData});
    }, [geoData])


    // onLoad用　callback関数
    const handler = React.useCallback(() => {
        const map = mapRef.current;

        // マーカーの生成
        for(let i = 0; i < geoData.elements.length; i++) {
            setMarker(geoData.elements[i], map);
        }

        // ディレクションを追加
        // map.addControl(
        //     new MapboxDirections({
        //         accessToken: "3407afe23e7c46cca1391c93f9f84567"
        //     })
        // )

    }, [])


    

    // マーカーのセット
    const setMarker = (e, map) => {

        // tag要素があり、
        if("tags" in e && e["type"] === "node"){

            // popup
            const popup = new geolonia.Popup()
                .setText(e["tags"]["name"]);

            // marker
            const marker = new geolonia.Marker({color: '#F9BF3D'})
                .setLngLat([e.lon, e.lat])
                .setPopup(popup)
                .addTo(map);

            marker.getElement().style.cursor = 'pointer';

            // event
            marker.getElement().addEventListener('click', () => {
                setMarkerInfo({lng: e.lon, lat: e.lat, name: e.tags.name});
            }, false);
        }
    }




    // 再検索ボタンクリック処理
    function reSearch() {
        console.log('call reSearch!!');
        searchFunc();
    }


    // 決定ボタンクリック処理
    function decision() {
        if(markerInfo.lng !== "" && markerInfo.lat !== "" && markerInfo.name !== ""){
            addDestListFunc({prefecture: pref, category: cate, facilityName: markerInfo.name, lat: markerInfo.lat, lng: markerInfo.lng})
        }
    }


    // プラン確定ボタンクリック処理
    function planFixed() {
        planDecisionFunc();
    }


    // 行きたいところ削除
    function delPlace(id) {
        delDestListFunc(id);
    }


    /* ~~~~~~~~~ return ~~~~~~~~ */ 

    return (
        <div className={`${styles.content__inner} ${styles.destinationSelect}`}>
            <div className={`${styles.mainContent_header}`}>
                <div className={styles.destinationArea}>
                    <p className={`${styles.title} ${globalStyle.paddingLeft_m} ${globalStyle.paddingBottom_xs}`}>行き先</p>
                    <p className={`${styles.destination} ${globalStyle.paddingLeft_m}`}>
                        { pref + ' > ' + cate }
                    </p>
                </div>
                <div className={styles.searchArea}>
                    <SearchArea onClickFunc={reSearch} small/>
                </div>
            </div>
            <div className={styles.mapContentWrapper}>
                <div className={styles.mapArea}>
                    <GeoloniaMap 
                        apiKey={"3407afe23e7c46cca1391c93f9f84567"}
                        style={{height: "400px", width: "100%"}}
                        lat={center.lat}
                        lng={center.lng}
                        zoom="8"
                        marker="off"
                        mapRef={mapRef}
                        onLoad={handler}
                        mapStyle={styleIdentifier}
                    />
                    <StyleSelector style={styleSelectorStyle} styleIdentifier={styleIdentifier} setStyleIdentifier={setStyleIdentifier} />
                    
                    <div className={`${styles.text_contents} ${globalStyle.paddingRight_s} ${globalStyle.paddingLeft_s} ${globalStyle.paddingTop_l} ${globalStyle.paddingBottom_l}`}>
                        <p>あなたが最もワクワクするピンを選択してください！！</p>
                        <Button text="決定" onClickFunc={() => { decision() }} />
                    </div>
                </div>
                
                <div className={styles.destinationList_wrapper}>
                    <div className={styles.destinationList}>
                        <div className={styles.header}>行きたいところリスト</div>
                        <ul className={styles.destinationList_inner}>
                            { itemList !== [] &&
                                itemList.map((val, index) => {
                                    return (
                                        <li key={"destinationList_li"+index}>
                                            <span>{ val.prefecture + ':' + val.category }</span>
                                            <span className={styles.facility}>{ val.facilityName }</span>
                                            <span onClick={() => delPlace(val.id)} className={styles.icon}><CloseRoundedIcon /></span>
                                        </li>
                                    )
                                }) 
                            }
                        </ul>
                    </div>
                    <Spacer size="s"/>
                    <Button text="プランを確定" onClickFunc={planFixed} full green/>
                </div>
            </div>
        </div>
    )
}
