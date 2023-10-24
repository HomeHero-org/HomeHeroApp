import styles from './UserHomePage.module.css';
import { useState } from 'react';
import InfoRequest from '../../Components/Profile/InfoRequest';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { useTranslation } from 'react-i18next';
const UserHomePage = () => {

    const { t } = useTranslation();
    const [isCollapseMenu, setCollapseMenu] = useState(true);
    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };


    return (
          
        <div className={`${styles.main_content}`}>
            <h1>{t('helloThisIsTheUserPage')}</h1>
            <InfoRequest />
        </div>
    );
};

export default UserHomePage;