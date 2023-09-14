import React from "react";
import styles from './InfoSection.module.css';
import RequestsList from "../RequestsList";
const InfoSection = (props) => {
    return(
        <div className={styles.mainBg}>
            {props.children}
            <RequestsList />
        </div>
        
    );
}

export default InfoSection;