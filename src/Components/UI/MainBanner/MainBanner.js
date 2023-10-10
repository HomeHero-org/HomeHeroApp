import React from "react";
import styles from "./MainBanner.module.css";

const MainBanner = (props) => {
    return(
        <div className={styles.mainBanner}>
            {props.children}
        </div>
    );
}

export default MainBanner;