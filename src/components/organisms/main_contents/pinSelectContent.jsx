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

import StyleSelector from "../../atoms/styleSelector/styleSelector";



export default function PinSelectContent(props) {

    const { addDestListFunc, delDestListFunc, planDecisionFunc, itemList, prefData, cate, geoData, searchFunc } = props;

    /* ~~~~~~~~~ 定数・変数 ~~~~~~~~ */ 

    const [geoJson, setGeoJson] = React.useState("");
    const [markerInfo, setMarkerInfo] = React.useState({lng: 0, lat: 0, name: ""});
    const [center, setCenter] = React.useState({lng:127.96911949041572, lat:26.588972870618022});
    const [styleIdentifier, setStyleIdentifier] = React.useState('geolonia/basic');
    const [prefName, setPrefName] = React.useState('');
    const [selectItems, setSelectItems] = React.useState([]);
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
        if(prefData) {
            setCenter(() => { return { lng: prefData.lng, lat: prefData.lat }});
            setPrefName(() => { return prefData.name });
        }

        if(itemList.length > 0) {
            setSelectItems(() => { return itemList });
        }
        if(geoData !== '') {
            setGeoJson(() => {return geoData});
        }
    }, [geoData, itemList, prefData])


    // onLoad用　callback関数
    const handler = React.useCallback(() => {

        if(geoJson.elements) {
            const map = mapRef.current;

            // マーカーの生成
            for(let i = 0; i < geoJson.elements.length; i++) {
                setMarker(geoJson.elements[i], map);
            }

            // 中心位置をセット
            setCenter({lng: prefData.lng, lat: prefData.lat})
        }

    }, [geoJson])
    

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
        searchFunc();
    }


    // 決定ボタンクリック処理
    function decision() {
        if(markerInfo.lng !== "" && markerInfo.lat !== "" && markerInfo.name !== ""){
            addDestListFunc({prefecture: prefName, category: cate, facilityName: markerInfo.name, lat: markerInfo.lat, lng: markerInfo.lng})
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
                        { prefName + ' > ' + cate }
                    </p>
                </div>
                {/* <div className={styles.searchArea}>
                    <SearchArea onClickFunc={reSearch} small/>
                </div> */}
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
                        <p>あなたがワクワクするピンを選択してください！！</p>
                        <Button text="決定" onClickFunc={() => { decision() }} />
                    </div>
                </div>
                
                <div className={styles.destinationList_wrapper}>
                    <div className={styles.destinationList}>
                        <div className={styles.header}>行きたいところリスト</div>
                        <ul className={styles.destinationList_inner}>
                            { selectItems.length > 0 &&
                                selectItems.map((val, index) => {
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
