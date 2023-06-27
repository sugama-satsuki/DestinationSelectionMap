/* eslint-disable no-undef */
import React from "react";

/* import Map */ 
import { GeoloniaMap } from "@geolonia/embed-react";

/* import css */ 
import styles from './planDecisionContent.module.css';
import globalStyle from '../../../global.module.css';

/* import atoms */ 
import { BackBtn } from "../../atoms/button";

import data from "./example.geojson";




export default function PlanDecisionContent(props) {

    const { addDestListFunc, planDecisionFunc, destinationItems, backFunc } = props;


    /* ~~~~~~~~~ 定数・変数 ~~~~~~~~ */ 

    const center = [ 127.68515584340423, 26.176227738385577 ];


    /* ~~~~~~~~~ 関数 ~~~~~~~~ */ 

    // 再検索ボタンクリック処理
    function reSearch() {
        console.log('call reSearch!!');
    }

    // 決定ボタンクリック処理
    function decision() {
        console.log('call decision!');
        addDestListFunc({prefecture: pref, category: cate, facilityName: '施設名'})
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
                    geojson={data}
                    zoom="10"
                    marker="off"
                />
                <div className={`${styles.text_contents} ${globalStyle.padding_none} ${globalStyle.bgWhite}`}>
                    <ul className={styles.routeList}>
                        { destinationItems.map((val, index) => {
                            return (
                                <li key={index}>
                                    <span className={styles.sub_title}>{val.prefecture + "：" +  val.category}</span>
                                    <span className={styles.title}>{val.facilityName}</span>
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