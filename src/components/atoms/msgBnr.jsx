import React from "react";

/* import css */
import styles from './msgBnr.module.css';

/* import data */ 
import { msgArr } from '../../data/errMsg';



export default function MsgBnr(props) {

    const { msgId, closeFunc } = props;

    const [openFlag, setOpenFlag] = React.useState(false);

    React.useEffect(()=>{

        setOpenFlag(() => { return msgId !== ""})

    },[msgId])


    // 閉じる処理
    function close() {
        closeFunc("");
    }

    return(
        <div className={`${styles.msgBnr} ${msgId.indexOf("E") !== -1 && styles.errMsg } ${!openFlag && styles.hide}`} onClick={close}>
            { msgArr[msgId] }
        </div>
    )
}