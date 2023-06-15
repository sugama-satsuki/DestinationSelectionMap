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

/* import data */
import SearchArea from "../searchArea";



export default function PinSelectContent(props) {

    const { addDestListFunc, planDecisionFunc, itemList, pref, cate } = props;


    /* ~~~~~~~~~ 定数・変数 ~~~~~~~~ */ 

    // 再検索ボタンクリック処理
    function reSearch() {
        console.log('call reSearch!!');
    }

    // 決定ボタンクリック処理
    function decision() {
        console.log('call decision!');
        addDestListFunc({prefecture: pref, category: cate, facilityName: '施設名'})
    }

    function planFixed() {
        console.log("call plan Fixed!");
        planDecisionFunc();
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
                        lat="26.176227738385577"
                        lng="127.72197852"
                        zoom="10"
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
                                        <li key={"destinationList_li"+index}>{val.prefecture + ':' + val.category + '\b\b' + val.facilityName}</li>
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