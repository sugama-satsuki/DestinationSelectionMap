import React from "react";

import styles from "./spacer.module.css";


export default function Spacer(props) {

    const {size} = props;

    return(
        <div className={size === "s" ? styles.space_s : size === "m" ? styles.space_l : styles.space_m}></div>
    )
}