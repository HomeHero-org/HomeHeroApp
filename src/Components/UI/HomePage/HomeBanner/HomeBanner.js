import React from "react";
import styles from "./HomeBanner.module.css";
import MessageSlider from "../MessageSlider/MessageSlider";
import imgBanner from '../../../../Images/HomeHeroMainBrand.png';

const HomeBanner = () => {
    return (
        <div className={styles.homeBanner}>
            <div className={styles.part}>
                <h1>HOME HERO</h1>
                <MessageSlider />
            </div>
            <div className={styles.part}>
                <div className={styles.imgBanner}>
                    <img src={imgBanner}/>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
