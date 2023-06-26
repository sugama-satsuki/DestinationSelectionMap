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

/* import data */
import { getOkinawaMuseum } from '../../../data/getJson';

/* import mui */ 
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';





export default function PinSelectContent(props) {

    const { addDestListFunc, delDestListFunc, planDecisionFunc, itemList, pref, cate, geoData } = props;

    /* ~~~~~~~~~ 定数・変数 ~~~~~~~~ */ 

    const [geoJson, setGeoJson] = React.useState("");
    
    React.useEffect(() => {

        setGeoJson(() => {return geoData});

    }, [geoData])


    // 再検索ボタンクリック処理
    function reSearch() {
        console.log('call reSearch!!');
    }

    // 決定ボタンクリック処理
    function decision() {
        addDestListFunc({prefecture: pref, category: cate, facilityName: '施設名'})
    }

    // プラン確定ボタンクリック処理
    function planFixed() {
        console.log("call plan Fixed!");
        planDecisionFunc();
    }

    // 行きたいところ削除
    function delPlace(id) {
        console.log(id);
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
                        geojson={geoJson}
                        zoom="10"
                        marker="off"
                        id="geoloniaMaps"
                    />
                    
                    <div className={`${styles.text_contents} ${globalStyle.paddingRight_s} ${globalStyle.paddingLeft_s} ${globalStyle.paddingTop_l} ${globalStyle.paddingBottom_l}`}>
                        <p>あなたが最もワクワクするピンを選択してください！</p>
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
                                            {val.prefecture + ':' + val.category + '\b\b' + val.facilityName}
                                            <span onClick={() => delPlace(val.id)}><CloseRoundedIcon /></span>
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