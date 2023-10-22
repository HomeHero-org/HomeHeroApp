import styles from './UserHomePage.module.css';
import { useState } from 'react';
import InfoRequest from '../../Components/Profile/InfoRequest';
const UserHomePage = () => {

    const [isCollapseMenu, setCollapseMenu] = useState(true);
    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };


    return (
        <div className={styles.main_content}>
            <h1 className={styles.motivational_phrase}>
                Nos alegra que estes hoy en HomeHero!
            </h1>
            <InfoRequest />
        </div>
    );
};

export default UserHomePage;