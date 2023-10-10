import React from "react";
import styles from './InfoSection.module.css';

const InfoSection = (props) => {
    return(
        <div className={styles.mainBg}>
            {props.children}
        </div>
    );
}

export default InfoSection;