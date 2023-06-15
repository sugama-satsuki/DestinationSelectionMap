import React from "react";

/* import css */ 
import styles from './mapArea.module.css';
import globalStyle from '../../global.module.css';

/* import atoms */
import Button from "../atoms/button";


export default function MapArea(props) {

    const {addDestListFunc} = props;

    return (
        <div className={`${styles.text_contents} ${globalStyle.paddingRight_s} ${globalStyle.paddingLeft_s} ${globalStyle.paddingTop_l} ${globalStyle.paddingBottom_l}`}>
            <p>あなたが最もワクワクするピンを選択してください！</p>
            <Button text="決定" onClickFnc={addDestListFunc} />
        </div>
    )
}