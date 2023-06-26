import React from "react";

import styles from "./button.module.css";



export default function Button(props) {

    const {full, onClickFunc, type, green, text} = props;

    function func() {
        onClickFunc();
    }

    return(
        <button type={type ? type : 'button'} 
          onClick={func} 
          className={`${styles.button} ${full && styles.fullWidth } ${green && styles.bgGreen}`}
        >
            { text }
        </button>
    )
}


export function BackBtn(props) {

    const {text, onclick} = props;

    return(
        <a onClick={onclick} className={styles.back}>{text}</a>
    )
}